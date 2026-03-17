<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StudentController;

Route::post('/students', [StudentController::class, 'store']);
Route::post('/event-register', [EventController::class, 'store']);

Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);



Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
