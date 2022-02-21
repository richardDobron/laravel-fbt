<?php

namespace fbt\LaravelPackage;

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
