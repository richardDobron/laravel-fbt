<?php

namespace tests;

use fbt\FbtConfig;
use fbt\LaravelPackage\FbtServiceProvider;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Spatie\Snapshots\Driver;
use Spatie\Snapshots\MatchesSnapshots;

abstract class TestCase extends \Orchestra\Testbench\TestCase
{
    use DatabaseMigrations;
    use MatchesSnapshots {
        assertMatchesSnapshot as protected assertMatchesSnapshotCall;
    }

    /**
     * Load package service provider.
     *
     * @param \Illuminate\Foundation\Application $app
     *
     * @return array
     */
    protected function getPackageProviders($app)
    {
        return [FbtServiceProvider::class];
    }

    protected function resolveApplicationConfiguration($app)
    {
        parent::resolveApplicationConfiguration($app);

        $app->config->set('fbt.driver', 'eloquent');
    }

    /**
     * Define environment setup.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    protected function getEnvironmentSetUp($app)
    {
        FbtConfig::set('author', 'richard');
        FbtConfig::set('locale', 'sk_SK');
        FbtConfig::set('path', __DIR__ . '/');

        // Setup default database to use sqlite :memory:
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);
    }

    protected function loadMigrationsFrom($paths)
    {
        $paths = (is_array($paths)) ? $paths : [$paths];
        $this->app->afterResolving('migrator', function ($migrator) use ($paths) {
            foreach ($paths as $path) {
                $migrator->path($path);
            }
        });
    }

    protected function setUp()
    {
        parent::setUp();

        $this->loadMigrationsFrom(dirname(__DIR__) . '/migrations');
    }

    public function assertMatchesSnapshot($actual, Driver $driver = null)
    {
        $this->assertMatchesSnapshotCall($actual, $driver ?? new TextDriver());
    }
}
