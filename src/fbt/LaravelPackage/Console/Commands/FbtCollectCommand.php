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
    protected $signature = 'fbt:collect-fbts {--path=./app : The directory where you want to scan usages of fbt in php files}
                                             {--views=true : Automatic compilation of the /resources/views directory.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Collect fbt instances from source.';

    public function handle(CollectFbtsService $collectFbtsService)
    {
        if (! $this->option('path')) {
            $this->error('--path option is required.');

            return 1;
        }

        try {
            $collectFbtsService->collectFromFiles(
                FbtConfig::get('path'),
                $this->option('path')
            );

            if ($this->option('views') === 'true') {
                $collectFbtsService->collectFromBladeFiles(
                    FbtConfig::get('path'),
                    base_path('resources/views/')
                );
            }
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            $this->error($e->getMessage());
        }
    }
}
