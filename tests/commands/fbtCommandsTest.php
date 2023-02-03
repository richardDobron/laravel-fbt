<?php

declare(strict_types=1);

namespace tests\commands;

use fbt\fbt;
use fbt\FbtConfig;
use fbt\Runtime\Shared\FbtHooks;

class fbtCommandsTest extends \tests\TestCase
{
    public function testFbtCollection()
    {
        $fbtDir = FbtConfig::get('path') . '/';
        $file = $fbtDir . '.source_strings.json';

        $textToExtract = (function () {
            return fbt(['You just friended ', fbt::name('name', getAnonymousName(), 1)], 'names');
        });

        $this->artisan('fbt:collect-fbts', [
            '--path' => dirname(__DIR__),
        ]);

        FbtHooks::storePhrases();

        $this->assertMatchesSnapshot(file_get_contents($file));
    }
}
