<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

Route::resource('events', EventController::class);