<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class AbstractAnnouncement extends Model
{
    use SoftDeletes;

    protected $announcementType;

    const BASE_FILLABLE = [
        'id',
        'title',
        'desriptions',
        'image_url',
        'price',
        'realt_id',
        'saller_name',
        'public_date',
        'isParse'
    ];

    const BASE_HIDDEN = [
        
    ];

    public function getDescriptions() {
        return $this->announcementType;
    }

    public function getFillable() {
        return $this->fillable;
    }

    public function getOwnFieldList()
    {
        return $this->ownFillable;
    }

    public function getPrefix()
    {
        return $this->realtPrefix;
    }
}