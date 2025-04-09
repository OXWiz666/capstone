<?php

use App\Http\Controllers\Admin\AppointmentsController;
use App\Http\Controllers\Admin\DoctorsController;
use App\Http\Controllers\Admin\HealthProgramsController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\PatientsController;
use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Doctor\DoctorController;
use App\Http\Controllers\MidwifeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\TestDashboard\TestDbControllerrr;
use App\Http\Controllers\VaccinationController;
use App\Http\Controllers\VaccineController;
use Illuminate\Http\Request;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ProfileController;
use App\Livewire\Doctor\DoctorDashboard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth Routes

Route::middleware(['Guest'])->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
    Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('forgot.password');
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

    Route::post('/forgotpw-post',[AuthController::class,'forgotPwFormPost'])->name('forgotpw.post');

    Route::get('/forgotpw-post/reset/{token}',[AuthController::class,'showResetPassword'])->name('forgotpw.reset.get');

    Route::post('/forgotpw/reset/{token}',[AuthController::class,'ResetPassword'])->name('forgotpw.reset.post');
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

    Route::get('/appointments',[PatientController::class,'appointments'])->name('patient.appoint');
    //Route::get('/dashboard/test', [TestDbControllerrr::class, 'index'])->name('dashboard.test');

    // Contact Routes
    //Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');
});

Route::middleware(['auth','Patient'])->group(function(){
    Route::prefix('patient')->group(function(){
        Route::get('/profile',[PatientController::class,'profile'])->name('patient.profile');
        Route::post('/profile/update',[PatientController::class,'update'])->name('patient.profile.update');
        Route::get('/medical-records',[PatientController::class,'medicalrecords'])->name('patient.medrecords');

        Route::get('/appointments/history',[PatientController::class,'appointmentshistory'])->name('patient.appoint.history');
        ## Appointment
        Route::post('/appointment/create',[PatientController::class,'storeAppointment'])->name('patient.appoint.create');
    });
});

Route::middleware(['auth','Doctor'])->group(function(){
    Route::prefix('doctor')->group(function(){
        //Route::get('/',[DoctorController::class,'index'])->name('doctor.home');
        //Route::get('/appointments',[AppointmentsController::class,'index'])->name('doctor.appointments');
    });
});

Route::middleware(['auth','Admin'])->group(function(){
    Route::prefix('admin')->group(function(){
        Route::get('/',[AdminDashboardController::class,'index'])->name('admin');


        Route::get('/programs',[HealthProgramsController::class,'index'])->name('admin.programs');
        Route::get('/inventory',[InventoryController::class,'index'])->name('admin.inventory');
        Route::get('/reports',[ReportsController::class,'index'])->name('admin.reports');
        Route::get('/doctors',[DoctorsController::class,'index'])->name('admin.doctors');


        Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
    });
});

Route::middleware(['auth','AdminDoctor'])->group(function() {
    Route::prefix('auth')->group(function(){
        Route::get('/appointments',[AppointmentsController::class,'index'])->name('admin.appointments');
        Route::get('/appointment/get/{appointment}', [AppointmentsController::class,'GetAppointment'])->name('admin.appointment.get');
        Route::get('/appointments',[AppointmentsController::class,'index'])->name('admin.appointments');
        Route::get('/patients',[PatientsController::class,'index'])->name('admin.patients');
    });
});


Route::middleware(['auth'])->group(function () {
    Route::match(['POST','GET'],'/logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        //return redirect('/');
        // $cookie = Cookie::forget('jwt');

        // Auth::logout();

        //return response()->json(['message' => 'Logged out successfully'])->withCookie($cookie);
        return app(AuthController::class)->getRedirectRoute();
    })->name('logout');
});

Route::middleware(['auth:sanctum','Midwife'])->group(function(){
    Route::prefix('Midwife')->group(function(){
        Route::get('/',[MidwifeController::class, 'index'])->name('midwife.dashboard');
    });
});










// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

//require __DIR__.'/auth.php';
