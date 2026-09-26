<?php

namespace fbt\LaravelPackage\Console\Commands;

use fbt\FbtConfig;
use fbt\LaravelPackage\Models\Phrase;
use fbt\LaravelPackage\Models\Source;
use fbt\LaravelPackage\Models\Translation;
use fbt\Services\MigrateV5Service;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FbtMigrateV5Command extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fbt:migrate-v5 {--digest= : Encoding of md5 hashes (base64 / hex), the `md5_digest` configuration by default}
                                           {--translations= : Translation files to migrate to base64 instead of the database (json driver), e.g. `./storage/fbt/translations/*.json`}
                                           {--dry-run : Only report the changes}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate phrases stored in the database (or translation files) to fbt 5 (hash encoding), and report translations to redo.';

    public function handle(): int
    {
        $digest = $this->option('digest') ?: FbtConfig::get('md5_digest');
        if (! in_array($digest, ['base64', 'hex'], true)) {
            $this->error("Unknown digest \"$digest\", expected base64 or hex.");

            return 1;
        }

        $dryRun = (bool)$this->option('dry-run');

        try {
            if ($this->option('translations')) {
                $this->migrateTranslationFiles($this->option('translations'), $digest, $dryRun);

                return 0;
            }

            if (FbtConfig::get('hash_module') === 'md5') {
                $converted = $this->convertHashes($digest, $dryRun);
                $this->info(($dryRun ? 'Hashes to convert' : 'Converted hashes') . " ($digest): $converted");
            }

            $this->reportLegacyTranslations();
        } catch (\Throwable $e) {
            $this->error($e->getMessage());

            return 1;
        }

        return 0;
    }

    public static function convertHash(string $hash, string $digest): string
    {
        if ($digest === 'base64' && strlen($hash) === 32 && ctype_xdigit($hash)) {
            return base64_encode(hex2bin($hash));
        }

        if ($digest === 'hex' && strlen($hash) === 24) {
            $binary = base64_decode($hash, true);
            if ($binary !== false && strlen($binary) === 16) {
                return bin2hex($binary);
            }
        }

        return $hash;
    }

    /**
     * @throws \Exception
     */
    private function migrateTranslationFiles(string $pattern, string $digest, bool $dryRun): void
    {
        if ($digest !== 'base64' || $dryRun) {
            throw new \Exception('Translation files are only migrated to base64 (hex keys of fbt 4 stay valid), without --dry-run.');
        }

        $files = glob($pattern) ?: [];
        if (! $files) {
            throw new \Exception("No translation files match \"$pattern\".");
        }

        // Collected hashes are compared only when they're encoded in base64 too
        $sourceFile = FbtConfig::get('path') . '/.source_strings.json';
        $source = FbtConfig::get('md5_digest') === 'base64' && is_file($sourceFile) ? $sourceFile : null;

        $report = (new MigrateV5Service($source))->migrateFiles($files);

        $this->info("Converted translation keys (base64): {$report['migrated']}");

        foreach ($report['unknown'] as $locale => $hashes) {
            $this->warn("[$locale] " . count($hashes) . ' translation(s) of strings that no longer exist (they have to be translated again):');
            foreach ($hashes as $hash) {
                $this->line("  $hash");
            }
        }

        foreach ($report['untranslated'] as $locale => $hashes) {
            $this->line("[$locale] " . count($hashes) . ' string(s) without translation');
        }
    }

    private function convertHashes(string $digest, bool $dryRun): int
    {
        $converted = 0;

        Phrase::query()->select(['id', 'hash'])->orderBy('id')->chunkById(500, function ($phrases) use ($digest, $dryRun, &$converted) {
            foreach ($phrases as $phrase) {
                $hash = self::convertHash($phrase->hash, $digest);
                if ($hash === $phrase->hash) {
                    continue;
                }

                $converted++;
                if ($dryRun) {
                    continue;
                }

                DB::transaction(function () use ($phrase, $hash) {
                    $existingId = Phrase::query()->where('hash', $hash)->value('id');

                    if ($existingId !== null) {
                        // Already collected with the new hash: keep its translations
                        Translation::query()->where('phrase_id', $phrase->id)->update(['phrase_id' => $existingId]);
                        Phrase::query()->where('parent_id', $phrase->id)->update(['parent_id' => $existingId]);
                        Phrase::query()->where('id', $phrase->id)->delete();
                    } else {
                        Phrase::query()->where('id', $phrase->id)->update(['hash' => $hash]);
                    }
                });
            }
        });

        return $converted;
    }

    private function reportLegacyTranslations(): void
    {
        $legacySourceIds = [];
        foreach (Source::query()->select(['id', 'raw_source'])->cursor() as $source) {
            if ($source->isLegacy()) {
                $legacySourceIds[] = $source->id;
            }
        }

        if (! $legacySourceIds) {
            $this->info('All sources were collected by fbt 5.');

            return;
        }

        $phrases = Phrase::query()
            ->whereIn('source_id', $legacySourceIds)
            ->whereHas('translations')
            ->get(['id', 'hash', 'text']);

        $this->warn(count($legacySourceIds) . ' source(s) were collected by fbt 4, run `php artisan fbt:collect-fbts`.');

        if ($phrases->isNotEmpty()) {
            $this->warn($phrases->count() . ' translated phrase(s) of these sources have to be translated again if they are not collected anymore:');
            foreach ($phrases as $phrase) {
                $this->line("  [{$phrase->hash}] {$phrase->text}");
            }
        }
    }
}
