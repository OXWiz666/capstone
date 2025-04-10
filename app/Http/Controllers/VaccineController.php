<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
class VaccineController extends Controller
{
    //
    public function index(){
        return Inertia::render('Authenticated/Patient/SeasonalProgram',[]);
        //return view('Landing.Vaccination.vaccination');
    }
}