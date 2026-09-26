<?php

namespace fbt\LaravelPackage\Console\Commands;

use fbt\FbtConfig;
use fbt\LaravelPackage\Services\CollectFbtsService;
use Illuminate\Console\Command;

class FbtCollectCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fbt:collect-fbts {--path=./app, ./resources/views : The directory where you want to scan usages of fbt in php files}
                                             {--fbt-common-path= : Optional path to the common strings module.}
                                             {--clean-cache=true : Remove cache file .source_strings.json.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Collect fbt instances from source.';

    public function handle(CollectFbtsService $collectFbtsService): int
    {
        if (! $this->option('path')) {
            $this->error('--path option is required.');

            return 1;
        }

        try {
            $paths = preg_split('/\s*,\s*/', trim($this->option('path')));

            foreach ($paths as $index => $path) {
                $collectFbtsService->collectFromFiles(
                    FbtConfig::get('path'),
                    $path,
                    $this->option('fbt-common-path') ?: null,
                    $index === 0 && $this->option('clean-cache') === 'true'
                );
            }
        } catch (\Throwable $e) {
            $this->error($e->getMessage());

            return 1;
        }

        return 0;
    }
}
