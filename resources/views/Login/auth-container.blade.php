<!-- filepath: /c:/Users/alpha/Downloads/CAPSTONE TANAN/bhcmsc/resources/views/Login/auth-container.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth Container</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="//unpkg.com/alpinejs" defer></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
        <!-- Logo and Health Center Name -->
        <div class="w-full max-w-md mb-8 flex flex-col items-center">
            @if ($logoUrl)
                <img
                    src="{{ $logoUrl }}"
                    alt="Health Center Logo"
                    class="w-24 h-24 mb-4 rounded-full border-4 border-black shadow-md"
                />
            @else
                <div class="w-24 h-24 mb-4 rounded-full bg-black flex items-center justify-center shadow-md">
                    👤
                </div>
            @endif
            <h1 class="text-2xl font-bold text-center text-gray-900">
                {{ $healthCenterName }}
            </h1>
            <p class="text-sm text-gray-600 mt-2 text-center tempo-49950e4d-e3e3-5aa9-a0b7-e9f92def9034" tempoelementid="tempo-49950e4d-e3e3-5aa9-a0b7-e9f92def9034">
                Rural Health Unit</p>
        </div>

        <!-- Auth Forms -->
        <div x-data="{ currentView: 'login' }" class="w-full max-w-md">
            <!-- Login Form -->
            <div x-show="currentView === 'login'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4">
                @include('Login.login-form', [
                    'onRegisterClick' => "currentView = 'register'",
                    'onForgotPasswordClick' => "currentView = 'forgotPassword'",
                ])
            </div>

            <!-- Register Form -->
            <div x-show="currentView === 'register'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4">
                @include('Login.register-form', [
                    'onLoginClick' => "currentView = 'login'",
                ])
            </div>

            <!-- Forgot Password Form -->
            <div x-show="currentView === 'forgotPassword'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0" x-transition:leave-end="opacity-0 translate-y-4">
                @include('Login.forgot-password-form', [
                    'onBack' => "currentView = 'login'",
                ])
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center text-xs text-gray-500">
            <p>© {{ date('Y') }} Barangay Calumpang Health Center</p>
            <p class="mt-1">All rights reserved</p>
        </div>
    </div>
</body>
</html>