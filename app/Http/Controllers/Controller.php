<?php

namespace App\Http\Controllers;


use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
abstract class Controller
{
    //

    public function getRedirectRoute() : Response
    {

        if(!Auth::check())
            return redirect()->route('login');

        //return redirect()->route('register');

        switch(Auth::user()->usertypeID){ // For Route . ->name()
            case "2":
                return redirect()->route('admin.dashboard');
            case "3":
                return redirect()->route('admin.dashboard');
            case "4":
                return redirect()->route('public');
            default:
                return redirect()->route('public');
        }
    }
}
