<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {

            if (!Schema::hasColumn('events', 'event_date')) {
                $table->date('event_date')->nullable();
            }

            // ❌ REMOVE duplicate columns
            // start_time & end_time already handled in previous migration

            // 🔥 remove old 'time' column safely
            if (Schema::hasColumn('events', 'time')) {
                $table->dropColumn('time');
            }

        });
    }

    public function down()
    {
        Schema::table('events', function (Blueprint $table) {

            if (Schema::hasColumn('events', 'event_date')) {
                $table->dropColumn('event_date');
            }

        });
    }
};