
<div class="w-full bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 flex flex-row items-center justify-between border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">Today's Appointments</h2>
        <a href="{{ route('appointments.index') }}" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            View All
        </a>
    </div>
    
    <div class="p-6">
        <div class="overflow-y-auto max-h-[400px] pr-4">
            <div class="space-y-4">
                @foreach($appointments as $appointment)
                    <div class="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                        <div class="flex items-center space-x-4">
                            <div class="bg-gray-100 p-2 rounded-full">
                                <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-medium">{{ $appointment['patientName'] }}</h3>
                                <div class="flex items-center space-x-2 text-sm text-gray-500">
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{{ $appointment['time'] }}</span>
                                    <span>•</span>
                                    <span>{{ $appointment['type'] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="px-3 py-1 rounded-full text-sm font-medium {{ $getStatusColor($appointment['status']) }}">
                                {{ ucfirst($appointment['status']) }}
                            </span>
                            <div class="relative" x-data="{ open: false }">
                                <button @click="open = !open" class="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                                    <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                                <div x-show="open" 
                                     @click.away="open = false"
                                     class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                     style="display: none;">
                                    <div class="py-1">
                                        <a href="{{ route('appointments.show', $appointment['id']) }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Details</a>
                                        <a href="{{ route('appointments.edit', $appointment['id']) }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Appointment</a>
                                        <form action="{{ route('appointments.cancel', $appointment['id']) }}" method="POST" class="block">
                                            @csrf
                                            @method('PATCH')
                                            <button type="submit" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div> 