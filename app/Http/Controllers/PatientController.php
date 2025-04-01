<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    //
    public function profile(){
        return Inertia::render("Authenticated/Patient/ProfilePage",[]);
        //return view('patient.profie');
    }
}
