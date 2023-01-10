<?php


return [

    /*
    |---------------------------------------------------------------------
    | @fbt, @fbs
    |---------------------------------------------------------------------
    */

    'fbt' => function ($expression) {
        return '<?php echo \fbt(' . $expression . '); ?>';
    },

    'fbs' => function ($expression) {
        return '<?php echo \fbs(' . $expression . '); ?>';
    },

    /*
    |---------------------------------------------------------------------
    | @fbtTransform, @endFbtTransform
    |---------------------------------------------------------------------
    */

    'fbtTransform' => function () {
        return '<?php \fbtTransform(); ?>';
    },

    'endFbtTransform' => function () {
        return '<?php \endFbtTransform(); ?>';
    },

];
