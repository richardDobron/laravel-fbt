<?php

namespace fbt\LaravelPackage\Services;

use fbt\FbtConfig;
use fbt\LaravelPackage\Models\Phrase;
use fbt\Transform\FbtTransform\Utils\TextPackager;

class FbtSourceStringsService
{
    private $phrases = [];
    private $childToParent = [];

    public function exportPhrases(bool $pretty = false)
    {
        $fbtDir = FbtConfig::get('path') . '/';

        if (! is_dir($fbtDir)) {
            mkdir($fbtDir, 0755, true);
        }

        $flags = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
        if ($pretty) {
            $flags |= JSON_PRETTY_PRINT;
        }

        $phrases = Phrase::with('source')->get();
        $textPackager = new TextPackager(FbtConfig::get('hash_module'));
        $parentIds = $phrases->groupBy('source_id')->pluck('*.id')->toArray();
        $sourceIds = [];

        foreach ($phrases as $phrase) {
            if (in_array($phrase->source->id, $sourceIds)) {
                continue;
            }

            $this->phrases[] = [
                'desc' => $phrase->description,
                'project' => $phrase->project,
                'author' => $phrase->author,
                'type' => $phrase->source->raw_source['type'],
                'jsfbt' => $phrase->source->raw_source['jsfbt'],
            ];

            if ($phrase->parent_id !== null) {
                $this->childToParent[count($this->phrases) - 1] = \fbt\LaravelPackage\search_group_array($phrase->parent_id, $parentIds);
            }

            $sourceIds[] = $phrase->source->id;
        }

        $this->phrases = $textPackager->pack($this->phrases);

        $phrasesOutput = [
            'phrases' => $this->phrases,
            'childParentMappings' => $this->childToParent,
        ];

        file_put_contents($fbtDir . '.source_strings.json', json_encode($phrasesOutput, $flags));
    }
}
