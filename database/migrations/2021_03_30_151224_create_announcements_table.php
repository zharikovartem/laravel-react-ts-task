<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Traits\BaseAnnouncementFields;

class CreateAnnouncementsTable extends Migration
{
    use BaseAnnouncementFields;
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table = BaseAnnouncementFields::getBaseFields($table);

            $table->text('adress')->nullable();
            $table->text('fullDesriptions')->nullable();
            $table->text('region')->nullable();
            $table->text('locality')->nullable();
            $table->text('city_area')->nullable();
            $table->text('metro')->nullable();
            $table->text('rooms')->nullable();
            $table->text('number_of_berths')->nullable();
            $table->text('floor')->nullable();
            $table->text('square')->nullable();
            $table->text('furniture')->nullable();
            $table->text('isPhone')->nullable();
            $table->text('renovation')->nullable();
            $table->text('appliances')->nullable();
            $table->text('additionally')->nullable();
            $table->text('notes')->nullable();
            $table->text('phone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('announcements');
    }
}
