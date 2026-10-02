<?php

declare(strict_types=1);

namespace tests\blade;

class fbtListTest extends \tests\TestCase
{
    public function testList()
    {
        $this->app['view']->addLocation(__DIR__ . '/views');

        $html = $this->app['view']->make('fbt-list', ['locations' => ['Tokyo', 'London', 'Vienna']])->render();

        $this->assertStringContainsString('Available Locations: Tokyo, London and Vienna.', $html);
        $this->assertStringContainsString('Available Locations: Tokyo, London or Vienna.', $html);
    }
}
