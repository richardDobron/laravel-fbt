---
id: getting_started
title: Integrating into your app
sidebar_label: Getting started
---

We recommend you read the [best practices](best_practices.md) for advice on how to best prepare your applications. We strongly encourage you to do so.

## 📦 Installing

```shell
$ composer require richarddobron/laravel-fbt
```
These steps are required:

1. Publish config file:
    - _We recommend setting the **author** and **project** options in /config/fbt.php._

```php
$ php artisan vendor:publish --provider="fbt\LaravelPackage\FbtServiceProvider" --tag=fbt-config
```

2. Run migrations:

```php
$ php artisan migrate
```

## 🔧 Configuration

### Options

The following options can be defined:

* **project** `string`: (Default: `website app`) Project to which the text belongs
* **author** `string`: Text author
* **viewerContext** `string`: (Default: `\fbt\Lib\IntlViewerContext::class`)
* **locale** `string`: (Default: `en_US`) User locale.
* **fbtCommon** `string`: (Default: `[]`) common strings, e.g. `[['text' => 'desc'], ...]`
* **fbtCommonPath** `string`: (Default: `null`) Path to the common strings module.
* **path** `string`: (Default: `storage_path('fbt/')`) Cache storage path for generated translations & source strings.
* **fallback** `array`: (Default: `[]`) Fallback translations, e.g. `['de_AT' => 'de_DE']` 

Below are the less important parameters.

* **collectFbt** `bool`: (Default: `true`) Collect fbt instances from the source and store them to a JSON file (or the database, see `driver`).
* **prettyPrint** `bool`: (Default: `true`) Pretty print source strings in a JSON file.
* **hash_module** `string`: (Default: `md5`) Hash module. You can choose `md5` or `tiger` hash module.
* **md5_digest** `string`: (Default: `hex`) Encoding of md5 hashes. You can choose `hex` (default in v4) or `base64` (default of fbt 5). Stored phrases and translations are keyed by it.
* **fbtHashKeyModule** `callable|string`: (Default: `null`) Function computing the hash keys of callsites (the keys of `translatedFbts.json`), or a path to a PHP file returning it. It receives the `jsfbt.t` table of a phrase. By default, `fbtHash::fbtHashKey()` (jenkins hash) is used. The same function has to be used by the runtime and the `translate` command.
* **driver** `string`: (Default: `json`) Storage of collected phrases and translations. You can choose `json` or `eloquent` (database).
* **extraOptions** `array`: (Default: `[]`) Extra options allowed on fbt callsites, e.g. `['myOption' => true]`. Their values are passed to the runtime (see the [`getFbtResult` hook](hooks.md#getfbtresult--getfbsresult)).
* **generateOuterTokenName** `bool`: (Default: `false`) Add the outer token name of inner strings to the collected phrases.
* **debug** `bool`: (Default: `config('app.debug')`) Debug mode, e.g. a missing parameter throws an exception.
* **logger** `bool`: (Default: `false`) Log impressions of displayed strings.

## 	🙋 IntlInterface
Optional implementation of IntlInterface on User Model.

Example code:

```php
<?php

namespace App\Models\Auth;

use fbt\Lib\IntlVariations;
use fbt\Lib\IntlViewerContextInterface;
use fbt\Runtime\Gender;

class User extends Authenticatable implements IntlViewerContextInterface
{
    public function getLocale(): string
    {
        return $this->locale;
    }

    public function getGender(): int
    {
        if ($this->gender === 'male') {
            return IntlVariations::GENDER_MALE;
        }

        if ($this->gender === 'female') {
            return IntlVariations::GENDER_FEMALE;
        }

        return IntlVariations::GENDER_UNKNOWN;
    }
}
```

**Note:** `auth()->user()` will be attached to `viewerContext` automatically.

## 	🚀 Artisan Commands

1. This command collects FBT strings across whole application in PHP files.
```shell
php artisan fbt:collect-fbts
```
Read more about [FBTs extracting](collection.md).

2. This command generates the missing translation hashes from collected source strings.
```shell
php artisan fbt:generate-translations
```

3. This command creates translation payloads stored in database/JSON file.
```shell
php artisan fbt:translate
```
Read more about [translating](translating.md).

4. This command migrates translation files from v4 to v5.
```shell
php ./vendor/bin/fbt migrate-v5 --translations="./path/to/translations/*.json" --src=./path/to/fbt/.source_strings.json
```
**⚠️ NOTE: It converts the hashes to `base64`, set `md5_digest` to `base64` first.** Read more about [upgrading to fbt 5](https://github.com/richardDobron/laravel-fbt/blob/main/UPGRADE.md).

## 📘 API

- [fbt(...);](api_intro.md)
- [fbt::param(...);](params.md)
- [fbt::enum(...);](enums.md)
- [fbt::name(...);](params.md)
- [fbt::plural(...);](plurals.md)
- [fbt::pronoun(...);](pronouns.md)
- [fbt::sameParam(...);](params.md)
- [fbt::c(...);](common.md)

```php
echo fbt('You just friended ' . \fbt\fbt::name('name', 'Sarah', 2 /* gender */), 'names');
```

## 🎨 Blade Directives

### @fbtTransform & @endFbtTransform
**@fbtTransform**: _This directive will turn output buffering on. While output buffering is active no output is sent from the script (other than headers), instead the output is stored in an internal buffer._

**@endFbtTransform**: _This directive will send the contents of the topmost output buffer (if any) and turn this output buffer off._

```php
@fbtTransform
   ...
   <fbt desc="auto-wrap example">
     Go on an
     <a href="#">
       <span>awesome</span> vacation
     </a>
   </fbt>
   ...
@endFbtTransform

// result: Go on an <a href="#"><span>awesome</span> vacation</a>
```

### @fbt

```php
@fbt(
 [
  'Go on an ',
  \fbt\createElement('a', \fbt\createElement('span', 'awesome'), ['href' => '#']),
  ' vacation',
 ],
 'It\'s simple',
 ['project' => "foo"]
)

// result: Go on an <a href="#"><span>awesome</span> vacation</a>
```

```php
@fbt('You just friended ' . \fbt\fbt::name('name', 'Sarah', 2 /* gender */), 'names')

// result: You just friended Sarah
```

```php
@fbt('A simple string', 'It\'s simple', ['project' => "foo"])

// result: A simple string
```

### Encoding in Blade
```php
$htmlText = \fbt('<strong>STRONG</strong> text', 'HTML text');

{{ $htmlText }}
// result: <strong>STRONG</strong> text

{!! $htmlText !!}
// result: <strong>STRONG</strong> text
```

### PhpStorm integration

The PhpStorm IDE can recognize the custom Blade directive if is set in *File > Settings > Languages & Frameworks > PHP >
Blade > Directives* by adding a new one with the following properties:

* Name: fbt
* Has parameters: yes
* Prefix: `<?php echo \fbt(`
* Suffix: `); ?>`


* Name: fbs
* Has parameters: yes
* Prefix: `<?php echo \fbs(`
* Suffix: `); ?>`


* Name: fbtTransform
* Has parameters: no


* Name: endFbtTransform
* Has parameters: no

![Blade directives settings in PhpStorm](phpstorm.png)
