<?php

declare(strict_types=1);

namespace tests\laravel;

use fbt\FbtConfig;
use fbt\Runtime\Shared\FbtHooks;

class laravelTest extends \tests\TestCase
{
    public function testLaravelLocaleListener()
    {
        $this->assertEquals('en', $this->app->getLocale());

        $this->app->setLocale('uk_UA');

        FbtConfig::set('locale', 'hu_HU');

        $this->assertEquals('uk_UA', $this->app->getLocale());

        FbtConfig::set('locale', 'sk_SK');

        $this->assertEquals('sk_SK', FbtHooks::locale());

        $this->app->config->set('fbt.locale', 'laravel');

        $this->assertEquals('sk_SK', FbtHooks::locale());

        $this->app->setLocale('fi_FI');

        $this->assertEquals('fi_FI', FbtHooks::locale());

        FbtConfig::set('locale', 'de_DE');

        $this->assertEquals('de_DE', FbtHooks::locale());

        $this->assertEquals('de_DE', $this->app->getLocale());
    }
}
