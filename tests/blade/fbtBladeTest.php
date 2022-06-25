<?php

declare(strict_types=1);

namespace tests\blade;

use fbt\Runtime\FbtTranslations;
use fbt\Runtime\Shared\FbtHooks;

class fbtBladeTest extends \tests\TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->app['view']->addLocation(__DIR__ . '/views');
    }

    public function testFbtDirective()
    {
        $rendered = $this->app['view']->make('fbt')->render();

        $this->assertEquals('A simple string', (string)$rendered);
    }

    public function testMultilineFbtDirective()
    {
        $rendered = $this->app['view']->make('fbt-multiline')->render();

        $this->assertEquals('Go on an <a href="#"><span>awesome</span></a> vacation', (string)$rendered);
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
        $fbtText = \fbt\fbt('<strong>STRONG</strong> text', 'HTML text');

        $rendered = $this->app['view']->make('fbt-reporting')->with(compact('text', 'lfbtText', 'fbtText'))->render();

        $this->assertEquals(
            file_get_contents(__DIR__ . '/expected/fbt-reporting.txt'),
            (string)$rendered
        );

        FbtHooks::unregister('canInline');
    }

    public function testHtmlFbt()
    {
        $rendered = $this->app['view']->make('fbt-html')->render();

        $this->assertEquals(
            file_get_contents(__DIR__ . '/expected/fbt-html.txt'),
            (string)$rendered
        );
    }
}
