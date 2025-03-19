<?php

use App\Http\Controllers\AdminDashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MidwifeController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\VaccinationController;
use App\Http\Controllers\VaccineController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

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
    Route::get('/contact', [LandingPageController::class, 'contact'])->name('contact');
    Route::get('/appointments', [LandingPageController::class, 'appointments'])->name('appointments');
    Route::get('/services/records', [LandingPageController::class, 'records'])->name('services.records');
    Route::get('/services/vaccinations', [VaccineController::class, 'index'])->name('services.vaccinations');
    Route::get('/faq', [LandingPageController::class, 'faq'])->name('faq');
    // Contact Routes
    //Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
});

Route::middleware(['auth','Admin'])->group(function(){
    Route::prefix('Admin')->group(function(){
        Route::get('/',[AdminDashboardController::class,'index'])->name('admin');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::match(['GET','POST'],'/logout', function () {
        $cookie = Cookie::forget('jwt');
        Auth::logout();

        return app(AuthController::class)->getRedirectRoute();
    })->name('logout');
});

Route::middleware(['auth:sanctum','Midwife'])->group(function(){
    Route::prefix('Midwife')->group(function(){
        Route::get('/',[MidwifeController::class, 'index'])->name('midwife.dashboard');
    });
});

// Route::get('{slug}',function(){
//     return app(AuthController::class)->getRedirectRoute();
// });
