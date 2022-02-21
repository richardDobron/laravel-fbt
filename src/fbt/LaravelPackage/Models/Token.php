<?php

namespace fbt\LaravelPackage\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property null|int $translation_id
 * @property null|int $phrase_id
 * @property string $token
 * @property string $type
 * @property null|bool $singular
 * @property Carbon $created_at
 *
 * @property Phrase $phrase
 * @property Translation $translation
 */
class Token extends Model
{
    protected $table = 'fbt_tokens';

    protected $casts = [
        'id' => 'int',
        'translation_id' => 'int',
        'phrase_id' => 'int',
        'token' => 'string',
        'type' => 'string',
        'singular' => 'bool',
    ];

    const UPDATED_AT = null;

    //--Relationships---------------------------------------------------------------------------------------------------

    public function phrase(): HasOne
    {
        return $this->hasOne(Phrase::class, 'id', 'phrase_id');
    }

    public function translation(): HasOne
    {
        return $this->hasOne(Translation::class, 'id', 'translation_id');
    }
}
