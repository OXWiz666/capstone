@extends('layouts.authlayout')

@section('content')
    <div class="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <!-- Step Navigation -->
        <div class="flex items-center space-x-2">
            <a href="{{ route('login') }}" class="p-2 rounded-full hover:bg-gray-200">
                ←
            </a>
            <h2 class="text-2xl font-bold text-center flex-1 pr-8">
                <span x-show="step === 'email'">Forgot Password</span>
                <span x-show="step === 'security'">Security Verification</span>
                <span x-show="step === 'reset'">Reset Password</span>
            </h2>
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

        <!-- Multi-Step Form -->
        <div x-data="{
            step: 'email',
            email: '',
            securityQuestion: '',
            securityAnswer: '',
            newPassword: '',
            confirmPassword: '',
            securityQuestions: [
                'What was your childhood nickname?',
                'What is the name of your first pet?',
                'In what city were you born?',
                'What is your mother\'s maiden name?',
                'What high school did you attend?',
            ],
            handleSubmit() {
                if (this.step === 'email') {
                    this.step = 'security';
                } else if (this.step === 'security') {
                    this.step = 'reset';
                } else {
                    // Submit the form
                    const formData = {
                        email: this.email,
                        securityQuestion: this.securityQuestion,
                        securityAnswer: this.securityAnswer,
                        newPassword: this.newPassword,
                        confirmPassword: this.confirmPassword,
                    };
                    console.log('Form submitted:', formData);
                    // You can send the form data to the server here
                }
            }
        }">
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Step 1: Email -->
                <div x-show="step === 'email'">
                    <div class="flex justify-center mb-4">
                        <div class="p-3 rounded-full bg-blue-100">
                            📧
                        </div>
                    </div>
                    <p class="text-center text-sm text-gray-600 mb-4">
                        Enter your email address and we'll help you reset your password.
                    </p>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" x-model="email" placeholder="Enter your email"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4">
                        @error('email')
                            <p class="text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Step 2: Security Verification -->
                <div x-show="step === 'security'">
                    <div class="flex justify-center mb-4">
                        <div class="p-3 rounded-full bg-blue-100">
                            🔑
                        </div>
                    </div>
                    <p class="text-center text-sm text-gray-600 mb-4">
                        Please answer your security question to verify your identity.
                    </p>
                    <div>
                        <label for="securityQuestion" class="block text-sm font-medium text-gray-700">Security
                            Question</label>
                        <select id="securityQuestion" x-model="securityQuestion"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out mb-4">
                            <option value="">Select a security question</option>
                            <template x-for="question in securityQuestions" :key="question">
                                <option :value="question" x-text="question"></option>
                            </template>
                        </select>
                        @error('securityQuestion')
                            <p class="text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                    <div>
                        <label for="securityAnswer" class="block text-sm font-medium text-gray-700">Answer</label>
                        <input type="text" id="securityAnswer" x-model="securityAnswer" placeholder="Your answer"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4">
                        @error('securityAnswer')
                            <p class="text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Step 3: Reset Password -->
                <div x-show="step === 'reset'">
                    <div class="flex justify-center mb-4">
                        <div class="p-3 rounded-full bg-blue-100">
                            🔑
                        </div>
                    </div>
                    <p class="text-center text-sm text-gray-600 mb-4">
                        Create a new password for your account.
                    </p>
                    <div>
                        <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" id="newPassword" x-model="newPassword" placeholder="New password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4">
                        @error('newPassword')
                            <p class="text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <input type="password" id="confirmPassword" x-model="confirmPassword" placeholder="Confirm password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-4">
                        @error('confirmPassword')
                            <p class="text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <span x-show="step === 'email'">Continue</span>
                    <span x-show="step === 'security'">Verify</span>
                    <span x-show="step === 'reset'">Reset Password</span>
                </button>
            </form>
        </div>
    </div>
@endsection


<!-- function(title,text,icon = 'success') -->
@push('scripts')
    @if ($errors->any())
        <script>
            alert_toast('Error!','{{$errors->first()}}','error')
        </script>
    @endif

    @if(session()->has('success'))
        <script>
            alert_toast('Success!',"{{session()->get('success')}}",'success')
        </script>
    @endif

    @if (session()->has('error'))
        <script>
            alert_toast('Error!',"{{session()->get('error')}}",'success')
        </script>
    @endif
@endpush
