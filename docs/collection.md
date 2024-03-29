---
id: collection
title: Extracting FBTs
sidebar_label: Extracting translatable texts
---

We provide `collect-fbts` as a utility for collecting strings.

```shell
php artisan fbt:collect-fbts --src=./path/to/project/
```

### Options:
| name                       | default                  | description                                                                   |
|----------------------------|--------------------------|-------------------------------------------------------------------------------|
| --path=`[path]`            | ./app, ./resources/views | The directory where you want to scan usages of fbt in php files (even blade). |
| --fbt-common-path=`[path]` | -                        | Optional path to the common strings module.                                   |
| --clean-cache=`[bool]`     | true                     | Remove cache file `.source_strings.json`.                                     |

⚠️ Unlike Facebook's version of fbt, we primarily collect `<fbt>` & translate strings during script execution.

Upon successful execution, the output of the `/storage/fbt/.source_strings.json` will be in the following format:

```php
[
  "phrases": [
    [
      "hashToText": [
        <hash>: <text>,
        ...
      ],
      "type": "text" | "table",
      "desc": <description>,
      "project": <project>,
      "jsfbt": string | ['t' => <table>, 'm' => <metadata>],
    ]
  ],
  "childParentMappings" => [
    <childIdx>: <parentIdx>
  ]
}
```

`phrases` here represents all the *source* information we need to
process and produce an `fbt::_(...)` callsite's final payload.  When
combined with corresponding translations to each `hashToText` entry we
can produce the translated payloads `fbt::_()` expects.

When it comes to moving from source text to translations, what is most
pertinent is the `hashToText` payload containing all relevant texts
with their identifying hash.  You can choose `md5` or `tiger` hash module.  It defaults to md5.

### A note on hashes

In the FBT framework, there are 2 main places we uses hashes for
identification: **text** and **fbt callsite**.  The `hashToText` mapping
above represents the hash of the **text** and its **description**.  This is used
when *building* the translated payloads.

The hash of the callsite (defaulting to `jenkins` hash) is used to
look up the payload in
[`FbtTranslations`](https://github.com/richardDobron/fbt/blob/main/src/fbt/Runtime/FbtTranslations.php).
This is basically the hash of the object you see in `jsfbt`.

See [Translating FBTs](translating.md) for getting your translations in
the right format.
