<?php

namespace fbt\LaravelPackage\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property int $id
 * @property array $raw_source
 *
 * @property Phrase[]|Collection $phrases
 */
class Source extends Model
{
    protected $table = 'fbt_sources';

    public $timestamps = false;

    protected $casts = [
        'id' => 'int',
        'raw_source' => 'array',
    ];

    //--Relationships---------------------------------------------------------------------------------------------------

    public function phrases(): HasMany
    {
        return $this->hasMany(Phrase::class, 'source_id', 'id');
    }
}
