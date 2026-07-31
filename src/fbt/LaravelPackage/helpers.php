<?php

namespace fbt\LaravelPackage;

/**
 * @param string|array $text
 * @param string $desc
 * @param array $options
 * @return \fbt\LaravelPackage\fbt
 *
 * @throws \fbt\Exceptions\FbtParserException
 */
function fbt($text, string $desc, array $options = []): fbt
{
    return new \fbt\LaravelPackage\fbt($text, $desc, $options);
}

/**
 * @param string|array $text
 * @param string $desc
 * @param array $options
 * @return \fbt\LaravelPackage\fbs
 *
 * @throws \fbt\Exceptions\FbtParserException
 */
function fbs($text, string $desc, array $options = []): fbs
{
    return new \fbt\LaravelPackage\fbs($text, $desc, $options);
}
