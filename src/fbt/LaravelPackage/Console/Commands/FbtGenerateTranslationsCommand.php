<?php

namespace fbt\LaravelPackage\Console\Commands;

use fbt\FbtConfig;
use fbt\Services\TranslationsGeneratorService;
use Illuminate\Console\Command;

class FbtGenerateTranslationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fbt:generate-translations {--src= : Path to collected source strings file}
                                                      {--translations= : Path to translation input file}
                                                      {--translations-input= : The translation files containing translations. E.g. `./path/to/translations/*.json`}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate missing translation hashes from collected source strings.';

    public function handle(TranslationsGeneratorService $translationsGeneratorService)
    {
        $path = FbtConfig::get('path');

        try {
            $translationsGeneratorService->generateTranslations(
                $this->option('src') ?: $path . "/.source_strings.json",
                $this->option('translations'),
                $this->option('translations-input') ?: $path . "/translation_input.json"
            );
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
