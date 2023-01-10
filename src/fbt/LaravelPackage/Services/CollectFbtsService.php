<?php

namespace fbt\LaravelPackage\Services;

use fbt\FbtConfig;
use function fbt\rsearch;
use fbt\Runtime\Shared\FbtHooks;

class CollectFbtsService extends \fbt\Services\CollectFbtsService
{
    public function compileStatements(string $value)
    {
        $callback = function ($match) {
            return isset($match[2]) ? '<?=' . $match[1] . $match[2] . '?>' : '';
        };

        return preg_replace_callback('/\B@(fbt)(\( ( (?>[^()]+) | (?2) )* \))?/x', $callback, $value);
    }

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
            $this->collectFromOneFile($this->compileStatements(file_get_contents($path)), $path);
        }

        FbtHooks::storePhrases();
    }
}
