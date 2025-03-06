<!-- Dashboard Header -->
<header class="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
    <div class="flex items-center justify-between h-full px-6">
        <!-- Health Center Name -->
        <div class="flex items-center">
            <img src="https://i.ibb.co/bjPTPJDW/344753576-269776018821308-8152932488548493632-n-removebg-preview.png" alt="Logo" class="h-8 w-8 mr-3">
            <h1 class="text-xl font-semibold text-gray-800">{{ $healthCenterName ?? 'Barangay Health Center' }}</h1>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4" x-data="{ open: false }">
            <!-- Notifications -->
            <div class="relative">
                <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                    <i data-lucide="bell" class="w-5 h-5"></i>
                    @if(($notificationCount ?? 0) > 0)
                        <span class="absolute top-0 right-0 h-5 w-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                            {{ $notificationCount }}
                        </span>
                    @endif
                </button>
            </div>

            <!-- User Dropdown -->
            <div class="relative" x-data="{ open: false }">
                <button @click="open = !open" class="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2">
                    <img src="https://ui-avatars.com/api/?name={{ urlencode($userFullName ?? 'User Name') }}" alt="User" class="h-8 w-8 rounded-full">
                    <div class="text-left">
                        <p class="text-sm font-medium text-gray-700">{{ $userFullName ?? 'User Name' }}</p>
                        <p class="text-xs text-gray-500">{{ $userRole ?? 'Health Worker' }}</p>
                    </div>
                    <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500"></i>
                </button>

                <!-- Dropdown Menu -->
                <div x-show="open" 
                     @click.away="open = false"
                     class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
                     style="display: none;">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <hr class="my-1">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Sign out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</header> 