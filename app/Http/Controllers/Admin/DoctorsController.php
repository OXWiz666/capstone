<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\doctor_details;
use App\Models\securityquestions;
use Illuminate\Http\Request;

use Inertia\Inertia;
class DoctorsController extends Controller
{
    //
    public function index(){
        $doctors = doctor_details::with(['user','specialty','department'])->get();
        $questions = securityquestions::get();
        return Inertia::render("Authenticated/Admin/Doctors/Doctors",[
            'doctors' => $doctors,
            'questions' => $questions
        ]);
    }
}