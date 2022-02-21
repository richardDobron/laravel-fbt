<?php

namespace fbt\LaravelPackage\Console\Commands;

use fbt\LaravelPackage\Services\FbtSourceStringsService;
use Illuminate\Console\Command;

class FbtPhrasesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fbt:phrases {--pretty : Pretty print the translation output}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate fbt source strings.';

    public function handle(FbtSourceStringsService $fbtSourceStringsService)
    {
        $fbtSourceStringsService->exportPhrases($this->option('pretty'));
    }
}
