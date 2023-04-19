<?php

namespace fbt\LaravelPackage;

use Carbon\Carbon;
use fbt\FbtConfig;
use function fbt\invariant;

use fbt\LaravelPackage\Console\Commands\FbtCollectCommand;

use fbt\LaravelPackage\Console\Commands\FbtGenerateTranslationsCommand;
use fbt\LaravelPackage\Console\Commands\FbtPhrasesCommand;
use fbt\LaravelPackage\Console\Commands\FbtTranslateCommand;
use fbt\LaravelPackage\Models\Phrase;
use fbt\LaravelPackage\Models\Source;
use fbt\LaravelPackage\Models\Token;
use fbt\LaravelPackage\Models\Translation;
use fbt\LaravelPackage\Services\FbtSourceStringsService;
use fbt\Lib\IntlViewerContextInterface;
use fbt\Runtime\Shared\FbtHooks;
use fbt\Transform\FbtTransform\FbtConstants;
use fbt\Transform\FbtTransform\FbtTransform;
use fbt\Transform\FbtTransform\Translate\FbtSiteMetaEntry;
use fbt\Transform\FbtTransform\Translate\IntlVariations;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class FbtServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishes([
            \dirname(__DIR__, 3) . '/config/fbt.php' => config_path('fbt.php'),
        ], 'fbt-config');

        $this->publishes([
            \dirname(__DIR__, 3) . '/migrations/' => database_path('migrations'),
        ], 'fbt-migrations');

        if ($this->app->runningInConsole()) {
            $this->loadMigrationsFrom(\dirname(__DIR__, 3) . '/migrations/');
        }

        $this->commands([
            FbtGenerateTranslationsCommand::class,
            FbtTranslateCommand::class,
            FbtCollectCommand::class,
            FbtPhrasesCommand::class,
        ]);

        $this->app->terminating(function () {
            FbtHooks::storePhrases();
            FbtHooks::storeImpressions();
        });

        $this->registerDirectives();

        Event::listen(
            \Illuminate\Auth\Events\Authenticated::class,
            function () {
                $user = auth()->user();

                if ($user instanceof IntlViewerContextInterface) {
                    FbtConfig::set('viewerContext', $user);
                }
            }
        );
    }

    /**
     * Register all directives.
     *
     * @return void
     */
    private function registerDirectives()
    {
        $directives = require __DIR__ . '/directives.php';

        collect($directives)->each(function ($item, $key) {
            Blade::directive($key, $item);
        });
    }

    public function registerHooks()
    {
        if (FbtConfig::get('driver') === 'eloquent') {
            FbtHooks::register('loadTranslationGroups', function () {
                $_translations = [];

                $usedTokens = [];
                $translationGroups = Translation::with([
                    'phrase.tokens',
                ])->get()->groupBy('locale');

                foreach ($translationGroups as $locale => $translations) {
                    $_translations[$locale]['fb-locale'] = $locale;

                    foreach ($translations as $translation) {
                        $phrase = $translation->phrase;
                        $tokens = $translation->extractTokens();

                        if (! isset($usedTokens[$locale][$phrase->id])) {
                            $usedTokens[$locale][$phrase->id] = $tokens;
                        }

                        $usedKeys = array_keys($usedTokens[$locale][$phrase->id]);
                        $tokensKeys = array_keys($tokens);
                        $phraseTokens = $phrase->tokens->pluck('type', 'token')->toArray() + [
                                IntlVariations::VIEWING_USER => IntlVariations::INTL_FBT_VARIATION_TYPE['GENDER'],
                                IntlVariations::SUBJECT => IntlVariations::INTL_FBT_VARIATION_TYPE['GENDER'],
                            ];

                        invariant(
                            ! $invalid = array_diff($tokensKeys, array_keys($phraseTokens)),
                            'Invalid token "%s" for translation ID %d',
                            implode(', ', $invalid),
                            $translation->id
                        );

                        invariant(
                            $usedKeys === $tokensKeys,
                            'Invalid order of tokens (%s), must be (%s) for translation ID %d',
                            implode(', ', $usedKeys),
                            implode(', ', $tokensKeys),
                            $translation->id
                        );

                        if (! isset($_translations[$locale]['translations'][$phrase->hash])) {
                            $_translations[$locale]['translations'][$phrase->hash] = [
                                'tokens' => $tokensKeys,
                                'types' => array_map(function ($token) use ($phraseTokens) {
                                    return FbtSiteMetaEntry::getVariationMaskFromType($phraseTokens[$token]);
                                }, $tokensKeys),
                            ];
                        }

                        $_translations[$locale]['translations'][$phrase->hash] = array_merge_recursive([
                            'translations' => [
                                [
                                    'translation' => $translation->translation,
                                    'variations' => array_values($tokens),
                                ],
                            ],
                        ], $_translations[$locale]['translations'][$phrase->hash] ?? []);
                    }
                }

                return $_translations;
            });

            FbtHooks::register('storePhrases', function () {
                DB::beginTransaction();
                $sourceStrings = FbtTransform::toArray();

                try {
                    $parentIds = [];
                    foreach ($sourceStrings['phrases'] as $index => $phrase) {
                        $parent = $sourceStrings['childParentMappings'][$index] ?? null;

                        foreach ($phrase['hashToText'] as $hash => $text) {
                            if (isset(FbtHooks::$storedHashes[$hash])) {
                                continue;
                            }
                            FbtHooks::$storedHashes[$hash] = true;

                            $phrase['hash'] = $hash;
                            $phrase['text'] = $text;

                            if ($parent !== null) {
                                $_parentIds = array_unique($parentIds);
                                $parentIds = [];
                                foreach ($_parentIds as $parentId) {
                                    $parentIds[] = FbtHooks::savePhrase($phrase, $parentId);
                                }
                            } else {
                                $parentIds = [FbtHooks::savePhrase($phrase)];
                            }
                        }
                    }
                } catch (\Throwable $e) {
                    DB::rollBack();

                    throw $e;
                }

                $fbtSourceStringsService = new FbtSourceStringsService();
                $fbtSourceStringsService->exportPhrases();

                FbtTransform::$childToParent = [];
                FbtTransform::$phrases = [];
                FbtHooks::$sourceHashes = [];

                DB::commit();
            });

            FbtHooks::register('savePhrase', function (array $phrase, $parentId = null) {
                $model = Phrase::firstOrNew([
                    'hash' => $phrase['hash'],
                ]);

                if (! $model->exists) {
                    $model->parent_id = $parentId;
                    $model->text = $phrase['text'];
                    $model->description = $phrase['desc'];
                    $model->project = $phrase['project'];
                    $model->author = $phrase['author'];
                    $model->created_at = Carbon::now();
                    if ($model->save() && $phrase['type'] === FbtConstants::FBT_TYPE['TABLE']) {
                        foreach ($phrase['jsfbt']['m'] as $metadata) {
                            if (isset($metadata['token'])) {
                                $token = new Token();
                                $token->token = $metadata['token'];
                                $token->type = $metadata['type'];
                                $token->created_at = Carbon::now();
                                $model->tokens()->save($token);
                            }
                        }
                    }

                    $phraseSource = [
                        'type' => $phrase['type'],
                        'jsfbt' => $phrase['jsfbt'],
                    ];

                    $hash = md5(json_encode($phraseSource) . $phrase['desc']);
                    if (! isset(FbtHooks::$sourceHashes[$hash])) {
                        $source = new Source();
                        $source->raw_source = $phraseSource;
                        $source->save();
                        FbtHooks::$sourceHashes[$hash] = $source->id;
                    }
                    $model->source_id = FbtHooks::$sourceHashes[$hash];
                    $model->save();
                }

                return $model->id;
            });
        }

        FbtHooks::register('onTerminating', function () {
            return false;
        });
    }

    public function register()
    {
        $this->mergeConfigFrom(
            \dirname(__DIR__, 3) . '/config/fbt.php',
            'fbt'
        );

        FbtConfig::setMultiple(config('fbt'));

        $this->registerHooks();
    }
}
