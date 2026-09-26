<?php

namespace fbt\LaravelPackage\Services;

use Illuminate\Support\Facades\Blade;

class CollectFbtsService extends \fbt\Services\CollectFbtsService
{
    /**
     * Blade views are collected from their compiled code.
     */
    protected function collectFromOneFile(string $source, string $path): bool
    {
        if (substr($path, -10) === '.blade.php') {
            $source = $this->renderBladeView($source);
        }

        return parent::collectFromOneFile($source, $path);
    }

    protected function renderBladeView(string $source): string
    {
        try {
            return Blade::compileString($source);
        } catch (\Exception $e) {
            return '';
        }
    }
}
