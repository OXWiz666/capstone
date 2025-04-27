<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\servicetypes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController extends Controller
{
    //

    public function index(){ // Overview
        return Inertia::render('Authenticated/Admin/Services/Overview',[

        ]);
    }

    public function services(){

        return Inertia::render('Authenticated/Admin/Services/Services',[
            'services_' => servicetypes::with(['subservices'])->get()
        ]);
    }
}
