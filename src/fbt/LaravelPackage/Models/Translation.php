<?php

namespace fbt\LaravelPackage\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property int $phrase_id
 * @property null|int $author_id
 * @property string $translation
 * @property null|string $token1
 * @property null|string $token2
 * @property null|string $token3
 * @property null|string $token4
 * @property string $locale
 * @property int $views
 * @property Carbon $created_at
 *
 * @property Phrase $phrase
 */
class Translation extends Model
{
    protected $table = 'fbt_translations';

    public const UPDATED_AT = null;

    protected $casts = [
        'id' => 'int',
        'phrase_id' => 'int',
        'author_id' => 'int',
        'translation' => 'string',
        'token1' => 'string',
        'token2' => 'string',
        'token3' => 'string',
        'token4' => 'string',
        'locale' => 'string',
        'views' => 'int',
    ];

    public const TOKEN_VARIATION_DELIMITER = '%';

    public function extractTokens(): array
    {
        $variations = [];
        $tokens = [
            $this->token1,
            $this->token2,
            $this->token3,
            $this->token4,
        ];

        foreach ($tokens as $rawData) {
            if (empty($rawData)) {
                continue;
            }

            [$token, $variation] = explode(self::TOKEN_VARIATION_DELIMITER, $rawData);
            $variations[$token] = $variation;
        }

        return $variations;
    }

    //--Relationships---------------------------------------------------------------------------------------------------

    public function phrase(): HasOne
    {
        return $this->hasOne(Phrase::class, 'id', 'phrase_id');
    }
}
