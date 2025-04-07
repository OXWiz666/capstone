<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
//use App\Models\Appointment;
use App\Models\appointments;
use Illuminate\Http\Request;

use Inertia\Inertia;
class AppointmentsController extends Controller
{
    //
    public function index(){
        $appointments = appointments::get();
        $appointments->load('user');
        $appointments->load('service');
        return Inertia::render('Authenticated/Admin/Appointments',[
            'Appoints' => $appointments
        ]);
    }

    public function GetAppointment(appointments $appointment){
        $appointment->load(['user','service']);
        return response()->json($appointment);
    }
}
