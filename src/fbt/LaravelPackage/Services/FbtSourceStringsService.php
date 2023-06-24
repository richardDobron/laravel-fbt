<?php

namespace fbt\LaravelPackage\Services;

use fbt\FbtConfig;
use fbt\LaravelPackage\Models\Phrase;

use function fbt\LaravelPackage\searchSubArray;

use fbt\Transform\FbtTransform\Utils\TextPackager;

class FbtSourceStringsService
{
    private $phrases = [];
    private $childToParent = [];

    /**
     * @throws \fbt\Exceptions\FbtInvalidConfigurationException
     * @throws \fbt\Exceptions\FbtException
     * @throws \Exception
     */
    public function exportPhrases()
    {
        $fbtDir = FbtConfig::get('path') . '/';

        if (! is_dir($fbtDir)) {
            mkdir($fbtDir, 0755, true);
        }

        $flags = 0;
        if (FbtConfig::get('prettyPrint')) {
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
                $this->childToParent[count($this->phrases) - 1] = searchSubArray($phrase->parent_id, $parentIds);
            }

            $sourceIds[] = $phrase->source->id;
        }

        $this->phrases = $textPackager->pack($this->phrases);

        $phrasesOutput = [
            'phrases' => $this->phrases,
            'childParentMappings' => $this->childToParent,
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
