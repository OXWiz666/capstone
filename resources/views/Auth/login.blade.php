@extends('layouts.authlayout')

@section('content')
    <div class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md tempo-4901d3a0-e44a-5c06-83da-013148656590"
        tempoelementid="tempo-4901d3a0-e44a-5c06-83da-013148656590">
        <!-- Header -->
        <div class="text-center tempo-9e2b83e7-3bfc-51aa-b96b-4edb7a76c148"
            tempoelementid="tempo-9e2b83e7-3bfc-51aa-b96b-4edb7a76c148">
            <h2 class="text-2xl font-bold text-gray-900 tempo-a8c523b6-4845-5b46-9db6-07846813ebf0"
                tempoelementid="tempo-a8c523b6-4845-5b46-9db6-07846813ebf0">Login</h2>
            <p class="mt-2 text-sm text-gray-600 tempo-a8ef0512-7824-5998-9f92-5a2bcde44870"
                tempoelementid="tempo-a8ef0512-7824-5998-9f92-5a2bcde44870">
                Sign in to your account to continue
            </p>
        </div>

        <!-- Display validation errors -->
        @if ($errors->any())
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Login Form -->
        <form action="{{ route('login.submit') }}" method="POST"
            class="space-y-4 tempo-e4c0dcc8-9974-585c-ad01-fe320c67bbfb"
            tempoelementid="tempo-e4c0dcc8-9974-585c-ad01-fe320c67bbfb">
            @csrf

            <!-- Email Field -->
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value="{{ old('email') }}">
                @error('email')
                    <p class="text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Password Field -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="relative">
                    <div x-data="{ showPassword: false }">
                        <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                            placeholder="Enter your password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <button type="button"
                            class="absolute right-0 top-0 h-9 w-9 flex items-center justify-center text-gray-500 hover:text-gray-700"
                            @click="showPassword = !showPassword">
                            <span x-show="!showPassword">👁️</span>
                            <span x-show="showPassword">👁️‍🗨️</span>
                        </button>
                    </div>
                </div>
                @error('password')
                    <p class="text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <!-- Remember Me Checkbox -->
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="rememberMe" name="rememberMe"
                        class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500">
                    <label for="rememberMe" class="text-sm font-medium text-gray-700 cursor-pointer">
                        Remember me
                    </label>
                </div>
                <a href="{{ route('forgot.password') }}" class="text-sm text-black hover:underline">
                    Forgot password?
                </a>
            </div>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                Sign In
            </button>
        </form>

        <!-- Register Link -->
        <div class="text-center text-sm">
            <span class="text-gray-600">Don't have an account? </span>
            <a href="{{ route('register') }}" class="text-black hover:underline font-semibold">
                Register
            </a>
        </div>
    </div>
@endsection
