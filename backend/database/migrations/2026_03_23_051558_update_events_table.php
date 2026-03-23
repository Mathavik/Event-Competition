<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::table('events', function (Blueprint $table) {
        $table->date('event_date')->nullable();
        $table->time('start_time')->nullable();
        $table->time('end_time')->nullable();

        $table->dropColumn('time'); // ❌ remove old column
    });
}
};
