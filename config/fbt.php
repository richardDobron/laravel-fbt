<?php

/*
 |--------------------------------------------------------------------------
 | Laravel fbt
 |--------------------------------------------------------------------------
 */
return [
    /*
     * Project to which the text belongs.
     */
    'project' => 'website app',

    /*
     * Default text author name.
     */
    'author' => null,

    /*
     * Logging of string impressions.
     */
    'logger' => false,

    /*
     * Collect fbt instances from the source and store them in a database.
     */
    'collectFbt' => true,

    /*
     * Viewer Context class name.
     */
    'viewerContext' => \fbt\Lib\IntlViewerContext::class,

    /*
     * User locale.
     */
    'locale' => 'en_US',

    /*
     * Hash module.
     * md5 / tiger
     */
    'hash_module' => 'md5',

    /*
     * Hash digest for md5 hash.
     * hex / base64
     */
    'md5_digest' => 'hex',

    /*
     * Cache storage path for generated translations & source strings.
     */
    'path' => storage_path('fbt/'),

    /*
     * Common string's, e.g. [['text' => 'desc'], ...].
     */
    'fbtCommon' => [],

    /*
     * Path to the common string's module.
     */
    'fbtCommonPath' => null,

    /*
     * Driver.
     * eloquent / json
     */
    'driver' => 'json',

    /*
     * Debug.
     */
    'debug' => \config('app.debug'),
];
