
<div class="w-full h-[400px] bg-white rounded-lg border border-gray-200 shadow-sm">
    <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Patient Queue
        </h3>
    </div>

    <div class="p-6">
        <div class="overflow-y-auto h-[300px] pr-4">
            <div class="space-y-4">
                @forelse($patients as $patient)
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center space-x-3">
                            <div class="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                @if($patient['avatarUrl'])
                                    <img src="{{ $patient['avatarUrl'] }}" alt="{{ $patient['name'] }}" class="h-full w-full object-cover">
                                @else
                                    <div class="h-full w-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium">
                                        {{ substr($patient['name'], 0, 1) }}
                                    </div>
                                @endif
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">{{ $patient['name'] }}</p>
                                <div class="flex items-center text-sm text-gray-500">
                                    <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {{ $patient['waitingTime'] }}
                                </div>
                            </div>
                        </div>
                        <span class="px-3 py-1 rounded-full text-sm font-medium {{ $getStatusBadgeColor($patient['status']) }}">
                            {{ str_replace('-', ' ', ucfirst($patient['status'])) }}
                        </span>
                    </div>
                @empty
                    <div class="text-center py-4 text-gray-500">
                        No patients in queue
                    </div>
                @endforelse

                @push('scripts')
<script>
function updateQueue() {
    fetch('/admin/queue/active')
        .then(response => response.json())
        .then(data => {
            // Update your queue component
        });
}

setInterval(updateQueue, 30000);
</script>
@endpush
            </div>
        </div>
    </div>
</div> 