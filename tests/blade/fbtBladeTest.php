<?php

declare(strict_types=1);

namespace tests\blade;

class fbtBladeTest extends \tests\TestCase
{
    protected function setUp()
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

    public function testHtmlFbt()
    {
        $rendered = $this->app['view']->make('fbt-html')->render();

        $this->assertEquals(
            file_get_contents(__DIR__ . '/expected/fbt-html.txt'),
            (string)$rendered
        );
    }
}
