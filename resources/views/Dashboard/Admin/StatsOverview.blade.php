@props(['stats' => [
    'appointments' => 15,
    'queueLength' => 8,
    'lowStockItems' => 3
]])

<div class="grid gap-4 md:grid-cols-3 bg-background p-4">
    {{-- Appointments Card --}}
    <div class="bg-white rounded-lg shadow">
        <div class="flex items-center p-6">
            <div class="p-2 rounded-lg bg-primary/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-600">Today's Appointments</p>
                <h3 class="text-2xl font-bold">{{ $stats['appointments'] }}</h3>
                <p class="text-sm text-gray-600">Scheduled for today</p>
            </div>
        </div>
    </div>

    {{-- Queue Card --}}
    <div class="bg-white rounded-lg shadow">
        <div class="flex items-center p-6">
            <div class="p-2 rounded-lg bg-primary/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-600">Patients in Queue</p>
                <h3 class="text-2xl font-bold">{{ $stats['queueLength'] }}</h3>
                <p class="text-sm text-gray-600">Currently waiting</p>
            </div>
        </div>
    </div>

    {{-- Medicine Card --}}
    <div class="bg-white rounded-lg shadow">
        <div class="flex items-center p-6">
            <div class="p-2 rounded-lg bg-primary/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m19 21-4-4m-4-4 4 4"></path>
                    <path d="M11 13c-.5-.5-1-1-1-2.5C10 9 11 8 12 7c1.5-1.5 2-3 2-4"></path>
                    <path d="m9 17 4-4"></path>
                    <path d="M17 21c-.5-.5-1-1-1-2.5 0-1.5 1-2.5 2-3.5 1.5-1.5 2-3 2-4"></path>
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-600">Low Stock Medicines</p>
                <h3 class="text-2xl font-bold">{{ $stats['lowStockItems'] }}</h3>
                <p class="text-sm text-gray-600">Need reordering</p>
            </div>
        </div>
    </div>
</div> 