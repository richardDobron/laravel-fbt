export default `Add internationalization to this Laravel app with laravel-fbt (docs: https://richarddobron.github.io/laravel-fbt/).

1. Install it with \`composer require richarddobron/laravel-fbt\` and publish the configuration with
   \`php artisan vendor:publish --tag=fbt-config\`.
2. In config/fbt.php, set \`author\` and \`project\`, and set \`locale\` to \`laravel\`, so that fbt follows the locale
   of the application. Keep the \`json\` driver (translations in storage/fbt), or set \`driver\` to \`eloquent\` and run
   \`php artisan migrate\` to keep phrases and translations in the database.
3. Make the User model implement \`fbt\\Lib\\IntlViewerContextInterface\` (\`getLocale()\` and \`getGender()\`), so that
   texts use the locale and the gender of the signed-in user.
4. Wrap every user-facing text:
   - in Blade: \`@fbt('Text', 'Description')\`, or \`<fbt desc="Description">Text</fbt>\` inside
     \`@fbtTransform\` ... \`@endFbtTransform\`,
   - in PHP: \`fbt('Text', 'Description')\`, and \`fbs()\` for plain text (e.g. HTML attributes).
   Every text needs a description which explains its context to translators.
5. Never concatenate translated fragments, keep whole sentences in one fbt. Use \`fbt::param()\` / \`<fbt:param>\` for
   values, \`fbt::plural()\` / \`<fbt:plural>\` for counts, \`fbt::name()\` / \`<fbt:name>\` for names of people (with
   their gender), \`fbt::enum()\` and \`fbt::pronoun()\`.
6. Collect the texts with \`php artisan fbt:collect-fbts\`, generate the missing translations with
   \`php artisan fbt:generate-translations\` (json driver) and build the translations with \`php artisan fbt:translate\`.`;
