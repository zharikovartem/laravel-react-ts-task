<?php

namespace App\Services;

use DiDom\Document;
use App\Announcement;
use App\Jobs\ParsingJob;

class Parser {
    private $ownFieldList;
    private $realtPrefix;
    private $baseURL = 'https://realt.by/';
    private $partText = '?page=';
    public $part;
    public $total;
    private $document;

    public function __construct($class, $part = 0)
    {
        $this->ownFieldList = $class->getOwnFieldList();
        $this->realtPrefix = $class->getPrefix();
        $this->part = $part;
        $this->getDocument();
        $this->getTotalToParse();
    }

    public static function createParseJob()
    {
        dispatch( (new ParsingJob(null ,new Parser( new Announcement(), 1))) );

        return 'ok';
    }

    public function startParse()
    {
        dispatch( (new ParsingJob(null ,$this)) );
        return [
            'count'=>$this->total,
            'url'=>$this->baseURL.$this->realtPrefix.$this->partText.$this->part
        ];
    }

    public function getAnnouncementList() {
        $document = new Document($this->baseURL.$this->realtPrefix.$this->partText.$this->part, true);
        $table = $document->find('.listing-item ');

        foreach ($table  as $key => $item) {
            $desc = $item->find('.desc');
            if (count($desc) > 0) {
                
                foreach ($desc[0]->find('span') as $key => $span) {
                    $spanArray = explode('ID ', $span->text() );
                    if ( count($spanArray) > 1) {
                        $realt_id =  explode('ID ', $span->text())[1];
                        $spanNumber = $key;
                    }
                }

                $announcements = Announcement::where('realt_id', $realt_id)->get();
                if (count($announcements) === 0) {
                    $announcement = new Announcement();
                    $marker = 'new';
                } else {
                    $announcement = $announcements[0];
                    $marker = 'old';
                }

                $announcement->realt_id = $realt_id;
                $announcement->public_date = $desc[0]->find('span')[$spanNumber-1]->text() ;
                $announcement->title = $item->find('.teaser-title')[0]->text();
                $announcement->desriptions = $item->find('.info-text')[0]->text();
                $announcement->image_url = $item->find('.lazy')[0]->attr('data-original');
                if ($announcement->image_url === 'typo3temp/pics/e4/b6/e4b6c05034170ddc52c59b6247744950.png') {
                    $announcement->image_url = null;
                }
                if ($item->has('.negotiable')) {
                    $announcement->price = null;
                } else {
                    $announcement->price = (int)explode(' BYN/сутки', $item->find('strong')[0]->text())[0] ;
                    if ($announcement->price === 0) {
                        $announcement->price = null;
                    }
                }
                
                
                if (!$announcement->isParse) {
                    $announcement = $this->getAnnouncement($announcement);
                }

                # add webSocket
                $announcement->save();

                $resp[$marker][] = $announcement;
            } 
        }

        if (count($table) > 0) {
            $this->part++;
            dispatch( (new ParsingJob(null ,$this)) );
        }
        
    }

    private function getAnnouncement(Announcement $announcement) 
    {
        $ownFieldList = $this->ownFieldList;
        $document = new Document($this->baseURL.$this->realtPrefix.'/object/'.$announcement->realt_id.'/', true);
        $rows = $document->find('tr');

        $arr = array();

        foreach ($rows as $key => $row) {
            $cols = $row->find('td');
            if (count($cols) > 1) {
                $rowKey = trim( $row->find('td')[0]->text() );
                
                if($rowKey && in_array($rowKey, $ownFieldList) ) {
                    $val = array_search( $rowKey, $ownFieldList );
                    $announcement->$val = trim( $row->find('td')[1]->text() );
                } else {
                    $arr[] = $rowKey;
                }
            }
        }

        $announcement->isParse = true;

        return $announcement;
    }

    private function getTotalToParse() 
    {
        $this->total = (int)explode('из ', $this->document->find('.mt-sm')[1]->find('.fs-small')[0]->find('strong')[1]->text())[1];
    }

    private function getDocument() 
    {
        $this->document = new Document($this->baseURL.$this->realtPrefix.$this->partText.$this->part, true);
    }

}
