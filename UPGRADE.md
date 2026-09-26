# Upgrading to fbt 5

This release requires [fbt 5](https://github.com/richardDobron/fbt/blob/main/UPGRADE-5.0.md), which collects
phrases in a new format. With the `eloquent` driver, run `php artisan migrate` (it widens the `project` column
of phrases to 100 characters).

The `md5_digest` configuration of this package stays `hex`, so the hashes of stored phrases and the keys of
translation files stay valid. Don't run `./vendor/bin/fbt migrate-v5`: it converts the keys to `base64`.

1. Collect the source strings again:

   ```shell
   php artisan fbt:collect-fbts --clean-cache=true
   ```

   With the `eloquent` driver, stored phrases (and their translations) are kept: once a phrase is collected
   again, it's moved from its fbt 4 source to the new one. Sources collected by fbt 4 aren't exported to
   `.source_strings.json` anymore.

2. Translate the phrases which changed in fbt 5 again (e.g. inner strings of HTML elements nested in an fbt,
   whose descriptions now contain the whole enclosing string). With the `json` driver, generate the missing
   translations first:

   ```shell
   php artisan fbt:generate-translations
   ```

3. Generate the translations:

   ```shell
   php artisan fbt:translate
   ```

To switch to `base64` (the default of fbt 5), set `md5_digest` to `base64` and translate all phrases again, or
migrate translation files with `./vendor/bin/fbt migrate-v5` (`json` driver only).
