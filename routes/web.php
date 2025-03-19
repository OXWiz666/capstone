<?php

use App\Http\Controllers\AdminDashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\VaccinationController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Auth;

// Auth Routes
Route::middleware(['Guest'])->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
    Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('forgot.password');
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
});

Route::middleware(['GuestOrPatient'])->group(function () {
    // Home Routes
    Route::get('/', [LandingPageController::class, 'index'])->name('home');
    Route::get('/services', [LandingPageController::class, 'services'])->name('services');
    Route::get('/about', [LandingPageController::class, 'about'])->name('about');
    Route::get('/faq', [LandingPageController::class, 'faq'])->name('faq');
    Route::get('/contact', [ContactController::class, 'index'])->name('contact');
    Route::get('/appointments', [LandingPageController::class, 'appointments'])->name('appointments');
    Route::get('/services/records', [LandingPageController::class, 'records'])->name('services.records');
    
    // Vaccination Routes
    Route::get('/services/vaccinations', [VaccinationController::class, 'index'])->name('services.vaccinations');
    Route::get('/services/vaccinations/by-date', [VaccinationController::class, 'getSchedulesByDate'])->name('services.vaccinations.by-date');

    // Contact Routes
    Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
});

Route::middleware(['auth','Admin'])->group(function(){
    Route::prefix('Admin')->group(function(){
        Route::get('/',[AdminDashboardController::class,'index'])->name('admin');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', function () {
        Auth::logout();

        return app(AuthController::class)->getRedirectRoute();
    })->name('logout');
});




// Admin Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard routes
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats'])->name('dashboard.stats');
    Route::get('/dashboard/queue', [AdminDashboardController::class, 'getQueueUpdates'])->name('dashboard.queue');
    Route::get('/dashboard/appointments', [AdminDashboardController::class, 'getAppointmentUpdates'])->name('dashboard.appointments');

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
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats'])->name('admin.dashboard.stats');
    // ... existing routes ...
});