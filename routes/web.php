<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\QueueController;



// Auth Routes

Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('forgot.password');
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

// Home Routes
Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/services', [LandingPageController::class, 'services'])->name('services');
Route::get('/about', [LandingPageController::class, 'about'])->name('about');
Route::get('/contact', [LandingPageController::class, 'contact'])->name('contact');
Route::get('/appointments', [LandingPageController::class, 'appointments'])->name('appointments');
Route::get('/services/records', [LandingPageController::class, 'records'])->name('services.records');
Route::get('/services/vaccinations', [LandingPageController::class, 'vaccinations'])->name('services.vaccinations');


// Contact Routes
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

// Admin Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');
    Route::get('/dashboard/queue', [DashboardController::class, 'getQueueUpdates'])->name('dashboard.queue');
    Route::get('/dashboard/appointments', [DashboardController::class, 'getAppointmentUpdates'])->name('dashboard.appointments');

    // Queue Management Routes
    Route::prefix('admin/queue')->name('admin.queue.')->group(function () {
        Route::get('/', [QueueController::class, 'index'])->name('index');
        Route::get('/active', [QueueController::class, 'getActiveQueue'])->name('active');
        Route::post('/add', [QueueController::class, 'addToQueue'])->name('add');
        Route::patch('/{id}/status', [QueueController::class, 'updateStatus'])->name('update.status');
        Route::delete('/{id}', [QueueController::class, 'removeFromQueue'])->name('remove');
        Route::get('/stats', [QueueController::class, 'getQueueStats'])->name('stats');
    });

    // Admin Appointment Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/appointments', [AppointmentController::class, 'appointments'])->name('appointments');
        Route::get('/appointments/{id}', [AppointmentController::class, 'showAppointment'])->name('appointments.show');
        Route::get('/appointments/{id}/edit', [AppointmentController::class, 'editAppointment'])->name('appointments.edit');
        Route::patch('/appointments/{id}', [AppointmentController::class, 'updateAppointment'])->name('appointments.update');
        Route::patch('/appointments/{id}/cancel', [AppointmentController::class, 'cancelAppointment'])->name('appointments.cancel');
        Route::get('/appointments/today', [AppointmentController::class, 'getTodayAppointments'])->name('appointments.today');
        Route::get('/appointments/upcoming', [AppointmentController::class, 'getUpcomingAppointments'])->name('appointments.upcoming');
    });
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats'])->name('admin.dashboard.stats');
    
    // ... existing routes ...
});
