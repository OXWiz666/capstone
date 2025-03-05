<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function showAuthContainer()
    {
        return view('Login.auth-container', [
            'logoUrl' => 'https://i.ibb.co/hSNmV3S/344753576-269776018821308-8152932488548493632-n.jpg',
            'healthCenterName' => 'Barangay Calumpang Health Center',
        ]);
    }

    public function showLoginForm()
    {
        return view('Login.login-form');
    }

    public function showRegisterForm()
    {
        return view('Auth.register');
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
        if (auth()->attempt($credentials)) {
            // Authentication passed, redirect to intended page or dashboard
            return redirect()->intended('dashboard')->with('success', 'You are logged in!');
        }

        // Authentication failed, redirect back with error message
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->withInput();
    }

    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|min:2',
            'position' => 'required',
            'contactNumber' => 'required|min:10',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'confirmPassword' => 'required|same:password',
            'securityQuestion' => 'required',
            'securityAnswer' => 'required',
        ];
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
