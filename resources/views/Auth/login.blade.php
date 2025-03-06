@extends('layouts.authlayout')

@section('content')
    <div class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md tempo-4901d3a0-e44a-5c06-83da-013148656590"
        tempoelementid="tempo-4901d3a0-e44a-5c06-83da-013148656590">


        <!-- Logo or Brand -->
            <div class="text-center">
                <img class="mx-auto h-16 w-auto" src="https://i.ibb.co/bjPTPJDW/344753576-269776018821308-8152932488548493632-n-removebg-preview.png" alt="Logo">
                <h2 class="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome back
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Sign in to your account to continue
                </p>
            </div>

        {{-- <!-- Header -->
        <div class="text-center tempo-9e2b83e7-3bfc-51aa-b96b-4edb7a76c148"
            tempoelementid="tempo-9e2b83e7-3bfc-51aa-b96b-4edb7a76c148">
            <h2 class="text-2xl font-bold text-gray-900 tempo-a8c523b6-4845-5b46-9db6-07846813ebf0"
                tempoelementid="tempo-a8c523b6-4845-5b46-9db6-07846813ebf0">Login</h2>
            <p class="mt-2 text-sm text-gray-600 tempo-a8ef0512-7824-5998-9f92-5a2bcde44870"
                tempoelementid="tempo-a8ef0512-7824-5998-9f92-5a2bcde44870">
                Sign in to your account to continue
            </p>
        </div> --}}

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
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </div>
                    <input type="text" id="email" name="email" placeholder="you@example.com"
                        class="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent hover:border-gray-400 backdrop-blur-sm"
                        value="{{ old('email') }}">
                </div>
            </div>

            <!-- Password Field -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div x-data="{ showPassword: false }">
                        <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                            placeholder="Enter your password"
                            class="pl-10 pr-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent hover:border-gray-400 backdrop-blur-sm"
                            >
                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg class="h-5 w-5 text-gray-400 hover:text-gray-600"
                                :class="{ 'hidden': showPassword, 'block': !showPassword }"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <svg class="h-5 w-5 text-gray-400 hover:text-gray-600"
                                :class="{ 'block': showPassword, 'hidden': !showPassword }"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                    clip-rule="evenodd" />
                                <path
                                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Remember Me and Forgot Password -->
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input type="checkbox" id="remember" name="remember"
                        class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded">
                    <label for="remember" class="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>
                <a href="{{ route('forgot.password') }}"
                    class="text-sm font-medium text-black hover:text-gray-800 transition-colors">
                    Forgot your password?
                </a>
            </div>
            <!-- Remember Me Checkbox -->
            {{-- <div class="flex items-center justify-between">
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
            </div> --}}

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

<!-- function(title,text,icon = 'success') -->
@push('scripts')
    @if ($errors->any())
        <script>
            alert_toast('Error!', '{{ $errors->first() }}', 'error')
        </script>
    @endif

    @if (session()->has('success'))
        <script>
            alert_toast('Success!', "{{ session()->get('success') }}", 'success')
        </script>
    @endif

    @if (session()->has('error'))
        <script>
            alert_toast('Error!', "{{ session()->get('error') }}", 'error')
        </script>
    @endif
@endpush
