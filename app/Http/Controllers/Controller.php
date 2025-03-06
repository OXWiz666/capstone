<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    //
    public function getRedirectRoute() : Response{

        if(!Auth::check())
            return redirect()->route('public');

        switch(Auth::user()->usertypeID){ // For Route . ->name()
            case "5":
                return redirect()->route('admin.dashboard');
            default:
                return redirect()->route('admin.dashboard');
        }

    }
}
