<?php

namespace App\Http\Controllers;

use App\Announcement;
use Illuminate\Http\Request;
use App\Services\Parser;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $role = $request->sort;
        // count
        // page
        $announcementsList = Announcement::
        offset($request->count*$request->page)
        ->limit($request->count)
        ->when($role, function ($query, $role) {
            return $query->orderBy('id', 'desc');
        })
        ->get();
        return response()->json([
            'announcementsList'=>$announcementsList,
            'count'=>Announcement::count(),
            // 'page'=>$request->page,
            // 'query'=>$request->query,
            // 'server'=>$request->server,
            // 'files'=>$request->files,
            // 'cookies'=>$request->cookies,
            // 'headers'=>$request->headers,
            // 'path1'=>$request->path1,
            // 'ofset'=>$request->ofset,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Announcement  $announcement
     * @return \Illuminate\Http\Response
     */
    public function show(Announcement $announcement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Announcement  $announcement
     * @return \Illuminate\Http\Response
     */
    public function edit(Announcement $announcement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Announcement  $announcement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Announcement $announcement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Announcement  $announcement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Announcement $announcement)
    {
        //
    }

    public function startAnnouncementsParsing(string $object, int $part = 0)
    {
        

        $className = "App\\".$object;
        $test = new $className();

        // dispatch(new AnnouncementsParsingJob([
        //     'part'=>$part,
        // ]));
        // $className = 'App/' . $object;

        $parser = new Parser($test);

        return response()->json([
            'message'=>'Parsing is started', 
            'part'=>$part,
            'object'=>$object,
            'className'=>$className,
            'announcementType'=>$test->getDescriptions(),
            'getOwnFieldList'=>$test->getOwnFieldList(),
            'getFillable'=>$test->getFillable(),
            'parser'=>$parser->startParse()
        ], 200);
    }
}
