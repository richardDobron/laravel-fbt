<?php

declare(strict_types=1);

namespace tests\laravel;

use fbt\FbtConfig;
use fbt\Lib\IntlViewerContext;
use fbt\Runtime\Shared\FbtHooks;

class viewerResetTest extends \tests\TestCase
{
    public function testViewerIsResetForEachJob()
    {
        FbtConfig::set('viewerContext', new IntlViewerContext());
        FbtConfig::set('locale', 'sk_SK');
        FbtHooks::locale('fi_FI');

        $this->app['events']->dispatch(new \Illuminate\Queue\Events\JobProcessing('sync', $this->createMock(\Illuminate\Contracts\Queue\Job::class)));

        $this->assertSame(IntlViewerContext::class, FbtConfig::get('viewerContext'));
        $this->assertSame('en_US', FbtConfig::get('locale'));
        $this->assertSame('en_US', FbtHooks::locale());
    }

    public function testViewerIsResetForEachOctaneRequest()
    {
        FbtConfig::set('viewerContext', new IntlViewerContext());
        $this->app['config']->set('fbt.locale', 'laravel');
        $this->app->setLocale('de_DE');

        // Laravel\Octane\Events\RequestReceived (Octane isn't installed)
        $event = new \stdClass();
        $event->sandbox = $this->app;
        $this->app['events']->dispatch('Laravel\Octane\Events\RequestReceived', [$event]);

        $this->assertSame(IntlViewerContext::class, FbtConfig::get('viewerContext'));
        $this->assertSame('de_DE', FbtConfig::get('locale'));
    }
}
