<?php

declare(strict_types=1);

namespace tests\laravel;

use fbt\FbtConfig;
use fbt\Runtime\Shared\FbtHooks;

class laravelTest extends \tests\TestCase
{
    public function testLaravelLocaleListener()
    {
        $this->app->setLocale('uk_UA');

        $this->assertEquals('sk_SK', FbtHooks::locale());

        $this->app->config->set('fbt.locale', 'laravel');

        $this->assertEquals('sk_SK', FbtHooks::locale());

        $this->app->setLocale('fi_FI');

        $this->assertEquals('fi_FI', FbtHooks::locale());

        FbtConfig::set('locale', 'de_DE');

        $this->assertEquals('de_DE', FbtHooks::locale());

        // todo: $this->assertEquals('de_DE', $this->app->getLocale());
    }
}
