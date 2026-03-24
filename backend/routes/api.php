<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminAuthController;

use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventRegistrationsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PaymentController;

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactController;


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
Route::get('/check-registration', [EventRegistrationsController::class, 'checkRegistration']);
Route::post('/categories/bulk', [CategoryController::class, 'bulkStore']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);



Route::post('/register-event', [EventRegistrationsController::class, 'registerEvent']);

Route::get('/payments', [PaymentController::class, 'index']);
Route::post('/payments', [PaymentController::class, 'store']);
Route::get('/payments/{id}', [PaymentController::class, 'show']);
Route::put('/payments/{id}', [PaymentController::class, 'update']);
Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/registrations', [StudentController::class, 'getRegistrations']);
Route::post('/team-name', [TeamController::class, 'store']);
Route::get('/team-names', [TeamController::class, 'index']);
Route::get('/team-names/{eventId}', [TeamController::class, 'showByEvent']);
Route::post('/team/register', [TeamController::class, 'registerTeam']);
Route::get('/gallery', [GalleryController::class, 'index']);
Route::post('/gallery', [GalleryController::class, 'store']);

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']); // admin

Route::get('/event/{id}/students', [EventController::class, 'getEventStudents']);
Route::post('/event/assign-winners', [EventController::class, 'assignWinners']);
Route::get('/event/{id}/certificate', [EventController::class, 'sendCertificates']);