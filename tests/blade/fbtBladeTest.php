<?php

declare(strict_types=1);

namespace tests\blade;

use fbt\Runtime\FbtTranslations;
use fbt\Runtime\Shared\FbtHooks;

class fbtBladeTest extends \tests\TestCase
{
    protected function setUp()
    {
        parent::setUp();

        $this->app['view']->addLocation(__DIR__ . '/views');
    }

    public function testFbtDirective()
    {
        $this->assertMatchesSnapshot(
            $this->app['view']->make('fbt')->render()
        );
    }

    public function testMultilineFbtDirective()
    {
        $this->assertMatchesSnapshot(
            $this->app['view']->make('fbt-multiline')->render()
        );
    }

    public function testHtmlable()
    {
        FbtHooks::inlineMode('TRANSLATE');

        FbtHooks::locale('fi_FI');
        FbtHooks::register('canInline', function () {
            return true;
        });

        FbtTranslations::registerTranslations([
            'fi_FI' => [
                "2b83aY" => [
                    "Näytä tiedot",
                    "491e7e732dba10235a901cc44f081399",
                ],
            ],
        ]);

        $text = \fbt\LaravelPackage\fbt('View', 'Button/Link: View something');
        $lfbtText = \fbt\LaravelPackage\fbt('<strong>STRONG</strong> text', 'HTML text');
        $fbtText = \fbt('<strong>STRONG</strong> text', 'HTML text');

        $rendered = $this->app['view']->make('fbt-reporting')->with(compact('text', 'lfbtText', 'fbtText'))->render();

        $this->assertMatchesSnapshot($rendered);

        FbtHooks::unregister('canInline');
    }

    public function testHtmlFbt()
    {
        $this->assertMatchesSnapshot(
            $this->app['view']->make('fbt-html')->render()
        );
    }
}
