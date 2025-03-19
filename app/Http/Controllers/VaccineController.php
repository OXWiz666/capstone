<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VaccineController extends Controller
{
    //
    public function index(){
        return view('Landing.Vaccination.vaccination');
    }
}
