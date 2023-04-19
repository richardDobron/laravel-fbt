<?php

declare(strict_types=1);

namespace tests\commands;

use fbt\fbt;
use fbt\FbtConfig;
use fbt\LaravelPackage\Models\Phrase;
use fbt\LaravelPackage\Models\Translation;
use fbt\Runtime\Shared\FbtHooks;

class fbtCommandsTest extends \tests\TestCase
{
    public function testTranslationFiles()
    {
        $fbtDir = FbtConfig::get('path') . '/';
        $file1 = $fbtDir . '.translations.json';
        $file2 = $fbtDir . 'translatedFbts.json';

        (string)fbt('simple text', 'desc');

        FbtHooks::storePhrases();

        $phrase = Phrase::get()->first();

        $translation = new Translation();
        $translation->translation = 'Jednoduchý reťazec';
        $translation->locale = 'sk_SK';

        $phrase->translations()->save($translation);

        $this->artisan('fbt:translate', [
            '--pretty' => true,
        ]);

        $this->assertMatchesSnapshot(file_get_contents($file1));
        $this->assertMatchesSnapshot(file_get_contents($file2));

        unlink($file1);
        unlink($file2);
    }

    public function testFbtCollection()
    {
        $fbtDir = FbtConfig::get('path') . '/';

        $textToExtract = (function () {
            return fbt(['You just friended ', fbt::name('name', getAnonymousName(), 1)], 'names');
        });

        $this->artisan('fbt:collect-fbts', [
            '--path' => dirname(__DIR__),
        ]);

        $this->assertMatchesSnapshot(file_get_contents($fbtDir . '.source_strings.json'));
    }
}
