<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;

use App\Models\roles;
use App\Models\securityquestions;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    public function getRedirectRoute() : Response
    {
        if(!Auth::check())
            return redirect()->route('login');

        // Check user role and redirect to appropriate dashboard
        switch(Auth::user()->roleID){ 
            case "1":
                return redirect()->route('admin');
            case "5":
                return redirect()->route('home');
            default:
                return redirect()->route('dashboard');
        }
    }

    public function showAuthContainer()
    {
        return view('Login.auth-container', [
            'logoUrl' => 'https://i.ibb.co/hSNmV3S/344753576-269776018821308-8152932488548493632-n.jpg',
            'healthCenterName' => 'Barangay Calumpang Health Center',
        ]);
    }

    public function showLogin()
    {
        return view('auth.login');
    }

    public function showRegisterForm()
    {
        $roles = roles::get();
        $questions = securityquestions::get();
        return view('Auth.register',compact('roles','questions'));
    }

    public function showForgotPasswordForm()
    {
        return view('auth.forgot');
    }

    public function login(Request $request)
    {
        // Validate the login request
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


         // Attempt to log the user in
        if (Auth::attempt($credentials)) {
            // Authentication was successful, redirect the user
            return redirect()->intended('/');  // Redirect to the intended route, like the dashboard
        }
        // Attempt to log the user in
        // if (auth()->attempt($credentials)) {
        //     // Authentication passed, redirect to intended page or dashboard
        //     return redirect()->intended('dashboard')->with('success', 'You are logged in!');
        // }

        // // Authentication failed, redirect back with error message
        return redirect()->back()->with('error','Invalid Credentials');
    }

    public function register(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|min:2',
            //'position' => 'required|min:1|max:5',
            'contactNumber' => 'required|min:11',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
            'securityQuestion' => 'required|min:1|max:5',
            'securityAnswer' => 'required'
        ]);

        $newUser = new User();
        $newUser->fullname = $request->name;
        $newUser->email = $request->email;
        $newUser->password = Hash::make($request->password);
        $newUser->contactno = $request->contactNumber;
        $newUser->roleID = 5;
        $newUser->questionID = $request->securityQuestion;
        $newUser->answer = $request->securityAnswer;
        $newUser->save();

        return redirect()->route('login')->with('success','Registered Successfully!');
    }


    // Handle the forgot password form submission
    public function handleForgotPassword(Request $request)
    {
        // Define validation rules
        $rules = [];
        if ($request->has('email')) {
            $rules = [
                'email' => 'required|email',
            ];
        } elseif ($request->has('securityQuestion')) {
            $rules = [
                'securityQuestion' => 'required',
                'securityAnswer' => 'required',
            ];
        } elseif ($request->has('newPassword')) {
            $rules = [
                'newPassword' => 'required|min:8',
                'confirmPassword' => 'required|same:newPassword',
            ];
        }
        // Validate the request
        $validator = Validator::make($request->all(), $rules);

        // If validation fails, redirect back with errors
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $step = $request->query('step', 'email');

        if ($step === 'email') {
            // Validate email and move to the next step
            return redirect()->route('forgot.password', ['step' => 'security']);
        } elseif ($step === 'security') {
            // Validate security question and move to the next step
            return redirect()->route('forgot.password', ['step' => 'reset']);
        } else {
            // Handle password reset logic
        }

        if ($request->has('email')) {
            // Step 1: Validate email
            return redirect()->route('forgot.password')->with('step', 'security');
        } elseif ($request->has('securityQuestion')) {
            // Step 2: Validate security question
            return redirect()->route('forgot.password')->with('step', 'reset');
        } else {
            // Step 3: Reset password
            // Handle password reset logic (e.g., update the user's password in the database)
        }

        // Handle the logic for resetting the password
        // For example, update the user's password in the database
        // You can use the Auth facade or your User model to update the password

        // Redirect to a success page or login page
        return redirect()->route('login')->with('success', 'Registration successful! Please log in.');
    }

}
