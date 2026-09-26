<?php

namespace fbt\LaravelPackage\Services;

use fbt\FbtConfig;
use fbt\LaravelPackage\Models\Phrase;
use fbt\Transform\FbtTransform\Utils\TextPackager;
use fbt\Util\JsJson;

class FbtSourceStringsService
{
    private $phrases = [];
    private $childToParent = [];

    /**
     * @throws \fbt\Exceptions\FbtInvalidConfigurationException
     * @throws \fbt\Exceptions\FbtException
     * @throws \Exception
     */
    public function exportPhrases(): void
    {
        $fbtDir = FbtConfig::get('path') . '/';

        if (! is_dir($fbtDir)) {
            mkdir($fbtDir, 0755, true);
        }

        $flags = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
        if (FbtConfig::get('prettyPrint')) {
            $flags |= JSON_PRETTY_PRINT;
        }

        $phrases = Phrase::with('source')->orderBy('id')->get();
        $textPackager = new TextPackager(FbtConfig::get('hash_module'));
        $sourceIndexes = [];

        foreach ($phrases as $phrase) {
            if (isset($sourceIndexes[$phrase->source_id]) || ! $phrase->source || $phrase->source->isLegacy()) {
                continue;
            }

            $sourceIndexes[$phrase->source_id] = count($this->phrases);
            $this->phrases[] = $phrase->source->raw_source;
        }

        $phraseSourceIds = $phrases->pluck('source_id', 'id');
        foreach ($phrases as $phrase) {
            $child = $sourceIndexes[$phrase->source_id] ?? null;
            $parent = $phrase->parent_id !== null ? ($sourceIndexes[$phraseSourceIds[$phrase->parent_id] ?? 0] ?? null) : null;

            if ($child !== null && $parent !== null && $child !== $parent) {
                $this->childToParent[$child] = $parent;
            }
        }

        $this->phrases = array_map(function (array $phrase) {
            $phrase['jsfbt']['t'] = JsJson::toJsObject($phrase['jsfbt']['t']);

            return $phrase;
        }, $textPackager->pack($this->phrases));

        $phrasesOutput = [
            'phrases' => $this->phrases,
            'childParentMappings' => JsJson::toJsObject($this->childToParent),
        ];

        $file = $fbtDir . '.source_strings.json';

        if (! is_dir($fbtDir) || ! is_writable($fbtDir)) {
            throw new \Exception("Directory $fbtDir is not writable.");
        } elseif (is_file($file) && ! is_writable($file)) {
            throw new \Exception("File $file is not writable.");
        }

        file_put_contents($file, json_encode($phrasesOutput, $flags));
    }
}
