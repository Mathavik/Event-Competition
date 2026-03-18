<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventRegistrationsController;

// Get all events for a student
Route::get('/student/{id}/events', [EventRegistrationsController::class, 'showEvents']);

// Register student for an event
Route::post('/event/register', [EventRegistrationsController::class, 'registerEvent']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/students', [StudentController::class, 'store']);
// Route::post('/event-register', [EventController::class, 'store']);

Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);
Route::post('/events/bulk', [EventController::class, 'bulkStore']);
Route::put('/events/bulk-update', [EventController::class, 'bulkUpdate']);

Route::post('/categories/bulk', [CategoryController::class, 'bulkStore']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/registrations', [StudentController::class, 'getRegistrations']);