@extends('layouts.dashboardlayout')

@section('content')
<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div class="flex space-x-4">
            <a href="{{ route('patients.create') }}" 
               class="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                New Patient
            </a>
            <a href="{{ route('appointments.create') }}"
               class="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <i data-lucide="calendar" class="w-4 h-4"></i>
                Schedule Appointment
            </a>
            <a href="{{ route('inventory.dispense') }}"
               class="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <i data-lucide="pill" class="w-4 h-4"></i>
                Dispense Medicine
            </a>
        </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Total Patients -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-500">Total Patients</h3>
                <span class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <i data-lucide="users" class="w-5 h-5"></i>
                </span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ number_format($totalPatients ?? 0) }}</p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="text-green-500">+{{ $newPatients ?? 0 }}</span> new this month
            </p>
        </div>

        <!-- Today's Appointments -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-500">Today's Appointments</h3>
                <span class="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <i data-lucide="calendar" class="w-5 h-5"></i>
                </span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ $todayAppointments ?? 0 }}</p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="text-purple-500">{{ $completedAppointments ?? 0 }}</span> completed
            </p>
        </div>

        <!-- Available Medicine -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-500">Available Medicine</h3>
                <span class="p-2 bg-green-50 text-green-600 rounded-lg">
                    <i data-lucide="pill" class="w-5 h-5"></i>
                </span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ $availableMedicine ?? 0 }}</p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="text-red-500">{{ $lowStockMedicine ?? 0 }}</span> low in stock
            </p>
        </div>

        <!-- Queue Status -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-500">Current Queue</h3>
                <span class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <i data-lucide="users" class="w-5 h-5"></i>
                </span>
            </div>
            <p class="text-2xl font-bold text-gray-900">{{ $currentQueue ?? 0 }}</p>
            <p class="text-sm text-gray-500 mt-2">
                <span class="text-orange-500">{{ $avgWaitTime ?? '0m' }}</span> avg. wait time
            </p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Appointments List -->
        <div class="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            </div>
            <div class="p-6">
                @if(isset($appointments) && count($appointments) > 0)
                    <div class="space-y-4">
                        @foreach($appointments as $appointment)
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img src="https://ui-avatars.com/api/?name={{ urlencode($appointment->patient_name ?? 'Patient') }}" 
                                             alt="{{ $appointment->patient_name }}" 
                                             class="w-10 h-10 rounded-full">
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900">{{ $appointment->patient_name }}</h3>
                                        <p class="text-sm text-gray-500">{{ $appointment->service }}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-gray-900">{{ $appointment->time }}</p>
                                    <p class="text-sm text-gray-500">{{ $appointment->date }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="text-center py-8">
                        <i data-lucide="calendar" class="w-12 h-12 mx-auto text-gray-400 mb-4"></i>
                        <h3 class="text-sm font-medium text-gray-900">No Upcoming Appointments</h3>
                        <p class="text-sm text-gray-500 mt-1">Schedule an appointment to get started</p>
                    </div>
                @endif
            </div>
        </div>

        <!-- Patient Queue -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-900">Patient Queue</h2>
            </div>
            <div class="p-6">
                @if(isset($queue) && count($queue) > 0)
                    <div class="space-y-4">
                        @foreach($queue as $patient)
                            <div class="flex items-center justify-between p-4 {{ $loop->first ? 'bg-green-50 border border-green-100' : 'bg-gray-50' }} rounded-lg">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img src="https://ui-avatars.com/api/?name={{ urlencode($patient->name ?? 'Patient') }}" 
                                             alt="{{ $patient->name }}" 
                                             class="w-10 h-10 rounded-full">
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900">{{ $patient->name }}</h3>
                                        <p class="text-sm text-gray-500">Queue #{{ $patient->queue_number }}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium {{ $loop->first ? 'text-green-600' : 'text-gray-900' }}">
                                        {{ $loop->first ? 'Current' : 'Waiting' }}
                                    </p>
                                    <p class="text-sm text-gray-500">{{ $patient->wait_time }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="text-center py-8">
                        <i data-lucide="users" class="w-12 h-12 mx-auto text-gray-400 mb-4"></i>
                        <h3 class="text-sm font-medium text-gray-900">Queue is Empty</h3>
                        <p class="text-sm text-gray-500 mt-1">No patients currently in queue</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection 