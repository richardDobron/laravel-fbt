<?php

namespace tests\Extensions;

use PHPUnit\Runner\AfterLastTestHook;

class Boot implements AfterLastTestHook
{
    public function executeAfterLastTest(): void
    {
        unlink(dirname(__DIR__) . '/.source_strings.json');
    }
}
