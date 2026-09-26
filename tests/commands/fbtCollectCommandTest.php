<?php

declare(strict_types=1);

namespace tests\commands;

use fbt\FbtConfig;

class fbtCollectCommandTest extends \tests\TestCase
{
    protected function resolveApplicationConfiguration($app)
    {
        parent::resolveApplicationConfiguration($app);

        $app->config->set('fbt.driver', 'json');
    }

    public function testCollectsAllPathsAndBladeViewsOnce()
    {
        $dir = sys_get_temp_dir() . '/fbt-collect-' . uniqid();
        mkdir($dir . '/app', 0777, true);
        mkdir($dir . '/views');
        file_put_contents($dir . '/app/Controller.php', "<?php\necho fbt('Collected from app', 'desc');\n");
        file_put_contents($dir . '/views/welcome.blade.php', "<p>@fbt('Collected from a view', 'desc')</p>\n{{ fbt('Collected from an echo', 'desc') }}\n");
        FbtConfig::set('path', $dir . '/fbt');

        $this->artisan('fbt:collect-fbts', ['--path' => $dir . '/app, ' . $dir . '/views'])
            ->assertExitCode(0);

        $texts = [];
        foreach (json_decode(file_get_contents($dir . '/fbt/.source_strings.json'), true)['phrases'] as $phrase) {
            foreach ($phrase['hashToLeaf'] as $leaf) {
                $texts[] = $leaf['text'];
            }
        }
        sort($texts);

        $this->assertSame(['Collected from a view', 'Collected from an echo', 'Collected from app'], $texts);

        array_map('unlink', array_merge(glob($dir . '/*/*'), glob($dir . '/fbt/.*.json')));
        array_map('rmdir', glob($dir . '/*'));
        rmdir($dir);
    }
}
