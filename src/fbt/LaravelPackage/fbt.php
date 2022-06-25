<?php

namespace fbt\LaravelPackage;

use Illuminate\Contracts\Support\Htmlable;

class fbt extends \fbt\fbt implements Htmlable
{
    public function toHtml(): string
    {
        return (string) $this;
    }
}
