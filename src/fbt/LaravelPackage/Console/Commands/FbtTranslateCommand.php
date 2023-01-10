<?php

namespace fbt\LaravelPackage\Console\Commands;

use fbt\FbtConfig;
use fbt\Services\TranslationsGeneratorService;
use Illuminate\Console\Command;

class FbtTranslateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fbt:translate {--pretty : Pretty print the translation output}
                                          {--stdin : Instead of reading translation files and source file separately, read monolithic JSON file from STDIN.}
                                          {--translations= : The translation files containing translations. If not specified, the translations are retrieved from the database.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translate fbt phrases with provided translations.';

    public function handle(TranslationsGeneratorService $translationsGeneratorService): int
    {
        try {
            $translationsGeneratorService->exportTranslations(
                FbtConfig::get('path'),
                $this->option('translations'),
                $this->option('stdin') ? file_get_contents("php://stdin") : null,
                $this->option('pretty')
            );
        } catch (\Throwable $e) {
            $this->error($e->getMessage());

            return 1;
        }

        return 0;
    }
}
