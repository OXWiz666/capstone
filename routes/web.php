<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\LandingPageController;


// Auth Routes
//Route::get('/login', [AuthController::class, 'showAuthContainer'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('forgot.password');

// Home Routes
Route::get('/login', [HomeController::class, 'index'])->name('login');

// Landing Page Controller
Route::get('/', [LandingPageController::class, 'index'])
     ->name('home');

// Footer Contact
Route::post('/footer/contact', [FooterController::class, 'submitFooterContact'])
     ->name('footer.contact');