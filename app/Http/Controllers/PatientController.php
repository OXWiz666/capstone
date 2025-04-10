<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\User;
use Illuminate\Validation\Rule;

class PatientController extends Controller
{
    //
    public function profile(){
        return Inertia::render("Authenticated/Patient/ProfilePage",[]);
        //return view('patient.profie');
    }


    public function update(Request $request){
        $cred = $request->validate([
            'firstname' => 'required|min:3',
            'lastname' => 'required|min:3',
            'email' => [
                'required',
                'min:3',
                Rule::unique('users')->ignore(Auth::user()->id)
            ] ,
            'phone' => [
                'required',
                'min:11',
                'numeric',
                Rule::unique('users', 'contactno')->ignore(Auth::user()->id,'id')
            ],
            'address' => 'required|min:3',
            'birthdate' => 'required',
            'bloodType' => 'required|min:1',
        ]);

        User::where('id',Auth::user()->id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'contactno' => $request->phone,
            'address' => $request->address,
            'birth' => $request->birthdate,
            'bloodtype' => $request->bloodType,
        ]);



    }
}
