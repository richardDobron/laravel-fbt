<?php

namespace fbt\LaravelPackage;

use Illuminate\Contracts\Support\Htmlable;

class fbs extends \fbt\fbs implements Htmlable
{
    public function toHtml(): string
    {
        return (string) $this;
    }
}
