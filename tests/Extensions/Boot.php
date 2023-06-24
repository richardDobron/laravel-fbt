<?php

namespace tests\Extensions;

use PHPUnit\Runner\AfterLastTestHook;
use PHPUnit\Runner\TestHook;

class Boot implements TestHook, AfterLastTestHook
{
    public function executeAfterLastTest(): void
    {
        unlink(dirname(__DIR__) . '/.source_strings.json');
    }
}
