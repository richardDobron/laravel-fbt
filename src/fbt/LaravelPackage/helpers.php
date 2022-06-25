<?php

namespace fbt\LaravelPackage;

use Illuminate\Support\HtmlString;

/**
 * @param mixed $value
 * @param array $array
 * @return int|string|null
 */
function search_group_array($value, array $array)
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
 * @return HtmlString
 *
 * @throws \fbt\Exceptions\FbtParserException
 */
function fbt($text, string $desc, array $options = [])
{
    return new HtmlString(\fbt\fbt($text, $desc, $options));
}

/**
 * @param string|array $text
 * @param string $desc
 * @param array $options
 * @return HtmlString
 *
 * @throws \fbt\Exceptions\FbtParserException
 */
function fbs($text, string $desc, array $options = [])
{
    return new HtmlString(\fbt\fbs($text, $desc, $options));
}
