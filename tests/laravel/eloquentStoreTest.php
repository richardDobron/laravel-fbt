<?php

declare(strict_types=1);

namespace tests\laravel;

use fbt\FbtConfig;
use fbt\LaravelPackage\Models\Phrase;
use fbt\LaravelPackage\Models\Source;
use fbt\LaravelPackage\Models\Translation;
use fbt\Runtime\Shared\FbtHooks;

class eloquentStoreTest extends \tests\TestCase
{
    public function testPhrasesOfFbt4AreMovedToTheirNewSource()
    {
        $file = FbtConfig::get('path') . '/.source_strings.json';
        @unlink($file);

        $legacySource = new Source();
        $legacySource->raw_source = ['type' => 'text', 'jsfbt' => 'simple text'];
        $legacySource->save();

        $phrase = new Phrase();
        $phrase->source_id = $legacySource->id;
        $phrase->hash = '5484cc530aff8e1f4e3ea8dc28775f7e';
        $phrase->text = 'simple text';
        $phrase->description = 'desc';
        $phrase->project = 'website app';
        $phrase->created_at = now();
        $phrase->save();

        $translation = new Translation();
        $translation->translation = 'Jednoduchý reťazec';
        $translation->locale = 'sk_SK';
        $phrase->translations()->save($translation);

        (string)fbt('simple text', 'desc');
        FbtHooks::storePhrases();

        $phrase->refresh();
        $this->assertNotSame($legacySource->id, $phrase->source_id);
        $this->assertFalse($phrase->source->isLegacy());
        $this->assertSame(1, Phrase::query()->count());
        $this->assertSame(1, $phrase->translations()->count());

        $sourceStrings = json_decode(file_get_contents($file), true);
        $this->assertCount(1, $sourceStrings['phrases']);
        $this->assertSame(['5484cc530aff8e1f4e3ea8dc28775f7e'], array_keys($sourceStrings['phrases'][0]['hashToLeaf']));
    }
}
