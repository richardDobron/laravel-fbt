<?php

declare(strict_types=1);

namespace tests\website;

use fbt\FbtConfig;
use fbt\Runtime\FbtTranslations;
use fbt\Runtime\Shared\FbtHooks;
use fbt\Services\TranslationsGeneratorService;
use fbt\Transform\FbtTransform\FbtTransform;

class websiteExamplesTest extends \tests\TestCase
{
    private const EXAMPLES = __DIR__ . '/../../website/src/examples.json';

    protected function resolveApplicationConfiguration($app)
    {
        parent::resolveApplicationConfiguration($app);

        $app->config->set('fbt.driver', 'json');
    }

    private static function render(string $example, array $values): string
    {
        switch ($example) {
            case 'plural':
                $html = '<fbt desc="Unread messages in the inbox">You have <fbt:plural count="' . $values['count'] . '" name="count" showCount="yes" many="unread messages">unread message</fbt:plural>.</fbt>';

                break;
            case 'name':
                $html = '<fbt desc="Notification about a shared photo"><fbt:name name="name" gender="' . $values['gender'] . '">' . $values['name'] . '</fbt:name> shared a photo with you.</fbt>';

                break;
            case 'enum':
                $html = '<fbt desc="Status of an order">Your order has been <fbt:enum enum-range=\'{"shipped":"shipped","delivered":"delivered","cancelled":"cancelled"}\' value="' . $values['status'] . '" />.</fbt>';

                break;
            case 'pronoun':
                $html = '<fbt desc="Notification about an updated profile"><fbt:param name="name">' . $values['name'] . '</fbt:param> updated <fbt:pronoun type="possessive" gender="' . $values['gender'] . '" human="true" /> profile.</fbt>';

                break;
            default:
                throw new \InvalidArgumentException("Unknown example $example");
        }

        return trim(strip_tags(FbtTransform::transform($html)));
    }

    public function testExamples()
    {
        $dir = sys_get_temp_dir() . '/fbt-website-' . uniqid();
        mkdir($dir);
        FbtConfig::set('path', $dir);

        $data = json_decode(file_get_contents(self::EXAMPLES), true);

        foreach ($data['examples'] as $example => $cases) {
            foreach ($cases as $case) {
                self::render($example, $case['values']);
            }
        }
        FbtHooks::storePhrases();

        (new TranslationsGeneratorService())->exportTranslations($dir, __DIR__ . '/translations/*.json', null, false);
        FbtTranslations::registerTranslations(json_decode(file_get_contents($dir . '/translatedFbts.json'), true));

        $update = (bool)getenv('FBT_UPDATE_EXAMPLES');
        foreach ($data['examples'] as $example => $cases) {
            foreach ($cases as $index => $case) {
                foreach (array_keys($data['locales']) as $locale) {
                    FbtHooks::locale($locale);
                    $output = self::render($example, $case['values']);

                    if ($update) {
                        $data['examples'][$example][$index]['outputs'][$locale] = $output;
                    } else {
                        $this->assertSame($case['outputs'][$locale] ?? null, $output, "$example #$index ($locale)");
                    }
                }
            }
        }

        if ($update) {
            file_put_contents(self::EXAMPLES, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n");
            $this->markTestIncomplete('Outputs of the examples were updated.');
        }

        array_map('unlink', glob($dir . '/{,.}*.json', GLOB_BRACE));
        rmdir($dir);
    }
}
