<?php

namespace fbt\LaravelPackage\Services;

use fbt\FbtConfig;

use function fbt\rsearch;

use fbt\Runtime\Shared\FbtHooks;

use Illuminate\Support\Facades\Blade;

class CollectFbtsService extends \fbt\Services\CollectFbtsService
{
    /**
     * @throws \fbt\Exceptions\FbtInvalidConfigurationException
     * @throws \Throwable
     * @throws \fbt\Exceptions\FbtParserException
     */
    public function collectFromBladeFiles(string $path, string $src)
    {
        $fbtDir = $path . '/';

        if (! is_dir($fbtDir)) {
            mkdir($fbtDir, 0755, true);
        }

        FbtConfig::set('path', $path);

        foreach (rsearch($src, '/.blade.php$/') as $path) {
            $this->collectFromOneFile($this->renderBladeView($path), $path);
        }

        FbtHooks::storePhrases();
    }

    protected function renderBladeView(string $path): string
    {
        try {
            return Blade::compileString(file_get_contents($path));
        } catch (\Exception $e) {
            return '';
        }
    }
}
