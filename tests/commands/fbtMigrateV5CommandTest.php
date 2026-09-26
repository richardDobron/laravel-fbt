<?php

declare(strict_types=1);

namespace tests\commands;

use fbt\FbtConfig;
use fbt\LaravelPackage\Console\Commands\FbtMigrateV5Command;
use fbt\LaravelPackage\Models\Phrase;
use fbt\LaravelPackage\Models\Translation;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class fbtMigrateV5CommandTest extends \tests\TestCase
{
    public function testConvertsHashes()
    {
        $hex = md5('Hello worldgreeting');
        $base64 = base64_encode(md5('Hello worldgreeting', true));

        $this->assertSame($base64, FbtMigrateV5Command::convertHash($hex, 'base64'));
        $this->assertSame($hex, FbtMigrateV5Command::convertHash($base64, 'hex'));
        $this->assertSame($base64, FbtMigrateV5Command::convertHash($base64, 'base64'));
        $this->assertSame('tiger-like-hash', FbtMigrateV5Command::convertHash('tiger-like-hash', 'hex'));
    }

    public function testMigratesHashesOfStoredPhrases()
    {
        FbtConfig::set('hash_module', 'md5');
        $now = date('Y-m-d H:i:s');
        $hex1 = md5('first');
        $hex2 = md5('second');

        $phrase1 = DB::table('fbt_phrases')->insertGetId([
            'hash' => $hex1, 'text' => 'First', 'description' => 'd', 'project' => 'app', 'created_at' => $now,
        ]);
        $phrase2 = DB::table('fbt_phrases')->insertGetId([
            'hash' => $hex2, 'text' => 'Second', 'description' => 'd', 'project' => 'app', 'created_at' => $now,
        ]);
        // Already collected with the new hash
        $collected = DB::table('fbt_phrases')->insertGetId([
            'hash' => base64_encode(hex2bin($hex2)), 'text' => 'Second', 'description' => 'd', 'project' => 'app', 'created_at' => $now,
        ]);
        DB::table('fbt_translations')->insert([
            ['phrase_id' => $phrase1, 'translation' => 'Prvý', 'locale' => 'sk_SK', 'created_at' => $now],
            ['phrase_id' => $phrase2, 'translation' => 'Druhý', 'locale' => 'sk_SK', 'created_at' => $now],
        ]);

        $this->assertSame(0, Artisan::call('fbt:migrate-v5', ['--digest' => 'base64', '--dry-run' => true]));
        $this->assertSame($hex1, Phrase::query()->findOrFail($phrase1)->hash);

        $this->assertSame(0, Artisan::call('fbt:migrate-v5', ['--digest' => 'base64']));

        $this->assertSame(base64_encode(hex2bin($hex1)), Phrase::query()->findOrFail($phrase1)->hash);
        $this->assertNull(Phrase::query()->find($phrase2));
        $this->assertSame($collected, (int)Translation::query()->where('translation', 'Druhý')->value('phrase_id'));
    }

    public function testMigratesTranslationFiles()
    {
        $dir = sys_get_temp_dir() . '/fbt-migrate-' . uniqid();
        mkdir($dir);
        $collected = md5('Hello worldgreeting');
        $changed = md5('awesomeIn the phrase: "{=} vacation"');
        file_put_contents($dir . '/sk_SK.json', json_encode([
            'fb-locale' => 'sk_SK',
            'translations' => [$collected => ['translations' => []], $changed => ['translations' => []]],
        ]));
        file_put_contents($dir . '/.source_strings.json', json_encode([
            'phrases' => [['hashToLeaf' => [base64_encode(hex2bin($collected)) => ['text' => 'Hello world', 'desc' => 'greeting']]]],
        ]));
        FbtConfig::set('path', $dir);
        FbtConfig::set('md5_digest', 'base64');

        // Hex keys of fbt 4 stay valid
        $this->artisan('fbt:migrate-v5', ['--translations' => $dir . '/*.json', '--digest' => 'hex'])
            ->assertExitCode(1);
        $this->assertArrayHasKey($collected, json_decode(file_get_contents($dir . '/sk_SK.json'), true)['translations']);

        $this->artisan('fbt:migrate-v5', ['--translations' => $dir . '/*.json'])
            ->expectsOutput('Converted translation keys (base64): 2')
            ->expectsOutput('  ' . base64_encode(hex2bin($changed)))
            ->assertExitCode(0);

        $this->assertSame(
            [base64_encode(hex2bin($collected)), base64_encode(hex2bin($changed))],
            array_keys(json_decode(file_get_contents($dir . '/sk_SK.json'), true)['translations'])
        );

        unlink($dir . '/sk_SK.json');
        unlink($dir . '/.source_strings.json');
        rmdir($dir);
    }

    public function testRejectsUnknownDigest()
    {
        $this->assertSame(1, Artisan::call('fbt:migrate-v5', ['--digest' => 'sha1']));
    }
}
