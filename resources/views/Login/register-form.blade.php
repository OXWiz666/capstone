<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="//unpkg.com/alpinejs" defer></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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

            <!-- Registration Form -->
            <form action="{{ route('register.submit') }}" method="POST" class="space-y-4">
                @csrf
                <!-- Header -->
                <h2 class="text-2xl font-bold text-center mb-6 text-black">
                    Register Account
                </h2>
                <!-- Full Name -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Juan Dela Cruz"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value="{{ old('name') }}"
                    >
                    @error('name')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Position/Role -->
                <div>
                    <label for="position" class="block text-sm font-medium text-gray-700">Position/Role</label>
                    <select
                        id="position"
                        name="position"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select your position</option>
                        @foreach ([
                            'doctor' => 'Doctor',
                            'nurse' => 'Nurse',
                            'midwife' => 'Midwife',
                            'healthWorker' => 'Health Worker',
                            'administrator' => 'Administrator',
                        ] as $value => $label)
                            <option value="{{ $value }}" {{ old('position') == $value ? 'selected' : '' }}>{{ $label }}</option>
                        @endforeach
                    </select>
                    @error('position')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Contact Number -->
                <div>
                    <label for="contactNumber" class="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="09123456789"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value="{{ old('contactNumber') }}"
                    >
                    @error('contactNumber')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="juan.delacruz@example.com"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value="{{ old('email') }}"
                    >
                    @error('email')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                    @error('password')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Confirm Password -->
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                    @error('confirmPassword')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Security Question -->
                <div>
                    <label for="securityQuestion" class="block text-sm font-medium text-gray-700">Security Question</label>
                    <select
                        id="securityQuestion"
                        name="securityQuestion"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select a security question</option>
                        @foreach ([
                            'birthPlace' => 'What is your place of birth?',
                            'firstPet' => 'What was the name of your first pet?',
                            'mothersMaidenName' => 'What is your mother\'s maiden name?',
                            'elementarySchool' => 'What elementary school did you attend?',
                            'favoriteColor' => 'What is your favorite color?',
                        ] as $value => $label)
                            <option value="{{ $value }}" {{ old('securityQuestion') == $value ? 'selected' : '' }}>{{ $label }}</option>
                        @endforeach
                    </select>
                    @error('securityQuestion')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Security Answer -->
                <div>
                    <label for="securityAnswer" class="block text-sm font-medium text-gray-700">Security Answer</label>
                    <input
                        type="text"
                        id="securityAnswer"
                        name="securityAnswer"
                        placeholder="Your answer"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value="{{ old('securityAnswer') }}"
                    >
                    @error('securityAnswer')
                        <p class="text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                    Register
                </button>
            </form>

            <!-- Login Link -->
            <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">
                    Already have an account? <a href="{{ route('home') }}" class="text-black hover:underline font-semibold">Login</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>