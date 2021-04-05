<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Services\Parser;

class ParsingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $classInstanse;

    protected $parserInstanse;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($classInstanse, $parserInstanse = null)
    {
        $this->classInstanse = $classInstanse;

        if ($parserInstanse) {
            $this->parserInstanse = $parserInstanse;
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Parser::startParse();
        if ($this->parserInstanse) {
            $this->parserInstanse->getAnnouncementList();

            info($this->parserInstanse->part);
        }
    }
}
