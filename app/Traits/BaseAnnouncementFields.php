<?php

namespace App\Traits;

use Illuminate\Database\Schema\Blueprint;

trait BaseAnnouncementFields {

    /**
     * Store a newly created resource in storage.
     *
     * @param  Blueprint $table
     * @return Blueprint $table
     */
    public static function getBaseFields(Blueprint $table) {
        $table->bigIncrements('id');
        $table->timestamps();
        $table->softDeletes();
        $table->text('title');
        $table->text('desriptions')->nullable();
        $table->text('image_url')->nullable();
        $table->decimal('price', 5, 2)->nullable();
        $table->integer('realt_id')->unique();
        $table->text('saller_name')->nullable();
        $table->date('public_date');
        $table->boolean('isParse')->default(false);

        return $table;
    }
}