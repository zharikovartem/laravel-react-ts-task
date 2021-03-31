<?php

namespace App;

// use Illuminate\Database\Eloquent\Model;
use App\AbstractAnnouncement;

class Announcement extends AbstractAnnouncement
{
    

    protected $table = 'announcements';

    public $ownFillable = [
        'adress'=>'Адрес',
        'fullDesriptions'=>'Описание',
        'region'=>'Область',
        'locality'=>'Населенный пункт',
        'city_area'=>'Район города',
        'metro'=>'Метро',
        'rooms'=>'Комнат всего/разд.',
        'number_of_berths'=>'Число спальных мест',
        'floor'=>'Этаж / этажность',
        'square'=>'Площадь общая/жилая/кухня',
        'furniture'=>'Мебель',
        'isPhone'=>'Телефон',
        'renovation'=>'Ремонт',
        'appliances'=>'Бытовая техника',
        'additionally'=>'Дополнительно',
        'notes'=>'Примечания',
        'phone'=>'object-contacts',
    ];

    protected $fillable;
    protected $hidden = [];
    protected $realtPrefix;

    public function __construct()
    {
        $this->announcementType = 'AnnouncementFlatForDay';
        $this->realtPrefix = 'rent/flat-for-day';
        $this->fillable = array_merge(parent::BASE_FILLABLE, array_keys($this->ownFillable));
        $this->hidden = array_merge(parent::BASE_HIDDEN, $this->hidden);
    }
}
