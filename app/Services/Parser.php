<?php

namespace App\Services;

use DiDom\Document;
use App\Announcement;

class Parser {
    private $ownFieldList;
    private $realtPrefix;
    private $baseURL = 'https://realt.by/';
    private $partText = '?page=';
    private $part;

    public function __construct($class, $part = 2)
    {
        $this->ownFieldList = $class->getOwnFieldList();
        $this->realtPrefix = $class->getPrefix();
        $this->part = $part;
    }

    public function startParse()
    {
        $response['ownFieldList'] = $this->ownFieldList;
        $response['realtPrefix'] = $this->realtPrefix;
        $response['getHTML'] = $this->getAnnouncementList();

        return $response;
    }

    private function getAnnouncementList() {
        $document = new Document($this->baseURL.$this->realtPrefix.$this->partText.$this->part, true);
        $table = $document->find('.listing-item ');

        $total = (int)$document->find('.mt-sm')[1]->find('.fs-small')[0]->find('strong')[0]->text();
        $resp['total'] = $total;

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
                if ($item->has('.negotiable')) {
                    $announcement->price = null;
                } else {
                    $announcement->price = (int)explode(' BYN/сутки', $item->find('strong')[0]->text())[0] ;
                    if ($announcement->price === 0) {
                        $announcement->price = null;
                    }
                }
                
                $announcement->save(); // не делать save 2 раза
                
                $announcement = $this->getAnnouncement($announcement);

                $resp[$marker][] = $announcement;
            } 
        }

        return $resp;
    }

    private function getAnnouncement(Announcement $announcement) 
    {
        $ownFieldList = $this->ownFieldList;
        $document = new Document($this->baseURL.$this->realtPrefix.'/object/'.$announcement->realt_id.'/', true);
        $rows = $document->find('tr');

        $announcement->testCount = 0;
        $arr = array();

        foreach ($rows as $key => $row) {
            $cols = $row->find('td');
            if ( 
                    count($cols) > 1
                    // && isset(
                    //     $ownFieldList[$row->find('td')[0]->text()]
                    // )
                ) {
                // $announcement->$ownFieldList[$row->find('td')[0]->text()] = $ownFieldList[$row->find('td')[1]->text()];
                // $announcement->testCount++;
                $arr[] = $row->find('td')[0]->text();
            }
        }

        $announcement->rows = $arr;
        $announcement->testCount = count($rows);
        $announcement->url = $this->baseURL.$this->realtPrefix.'/object/'.$announcement->realt_id.'/';

        return $announcement;
    }
}

