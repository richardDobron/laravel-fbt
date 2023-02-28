<?php

namespace fbt\LaravelPackage\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property int $parent_id
 * @property int $source_id
 * @property string $hash
 * @property string $text
 * @property string $description
 * @property int $views
 * @property string $author
 * @property string $project
 * @property Carbon $created_at
 *
 * @property Phrase $parent
 * @property Phrase $children
 * @property Source $source
 * @property Token[]|Collection $tokens
 */
class Phrase extends Model
{
    protected $table = 'fbt_phrases';

    const UPDATED_AT = null;

    protected $casts = [
        'id' => 'int',
        'parent_id' => 'int',
        'source_id' => 'int',
        'hash' => 'string',
        'text' => 'string',
        'description' => 'string',
        'views' => 'int',
        'author' => 'string',
        'project' => 'string',
    ];

    protected $fillable = [
        'parent_id',
        'hash',
    ];

    //--Methods---------------------------------------------------------------------------------------------------------

    public function setUpdatedAt($value)
    {
        // fixed laravel 5.5 updated_at issue
        if (!empty(self::UPDATED_AT)) {
            return parent::setUpdatedAt($value);
        }

        return $this;
    }

    //--Relationships---------------------------------------------------------------------------------------------------

    public function parent(): HasOne
    {
        return $this->hasOne(Phrase::class, 'id', 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Phrase::class, 'parent_id', 'id')->with('children');
    }

    public function source(): HasOne
    {
        return $this->hasOne(Source::class, 'id', 'source_id');
    }

    public function tokens(): HasMany
    {
        return $this->hasMany(Token::class, 'phrase_id', 'id');
    }

    public function translations(): HasMany
    {
        return $this->hasMany(Translation::class, 'phrase_id', 'id');
    }
}
