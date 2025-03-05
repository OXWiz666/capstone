<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;

// Auth Routes
// Auth Routes

// Auth Routes
//Route::get('/login', [AuthController::class, 'showAuthContainer'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('forgot.password');

// Home Routes
Route::get('/login', [HomeController::class, 'index'])->name('login');
