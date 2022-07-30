<?php

namespace fbt\LaravelPackage;

/**
 * @param mixed $value
 * @param array $array
 * @return int|string|null
 */
function searchSubArray($value, array $array)
{
    foreach ($array as $key => $val) {
        if (in_array($value, $val)) {
            return $key;
        }
    }

    return null;
}

/**
 * @param string|array $text
 * @param string $desc
 * @param array $options
 * @return \fbt\LaravelPackage\fbt
 *
 * @throws \fbt\Exceptions\FbtParserException
 */
function fbt($text, string $desc, array $options = [])
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
function fbs($text, string $desc, array $options = [])
{
    return \fbt\LaravelPackage\fbs($text, $desc, $options);
}
