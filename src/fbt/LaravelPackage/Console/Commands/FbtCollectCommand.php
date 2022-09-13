<?php

namespace fbt\LaravelPackage\Console\Commands;

use fbt\FbtConfig;
use fbt\Services\CollectFbtsService;
use Illuminate\Console\Command;

class FbtCollectCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fbt:collect-fbts {--path= : The directory where you want to scan usages of fbt in php files}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Collect fbt instances from source.';

    public function handle(CollectFbtsService $collectFbtsService)
    {
        try {
            $collectFbtsService->collectFromFiles(
                FbtConfig::get('path'),
                $this->option('path')
            );
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
