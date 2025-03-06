<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Appointment;
use App\Models\Medicine;
use App\Models\Queue;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Get total patients and new patients this month
        $totalPatients = Patient::count();
        $newPatients = Patient::whereMonth('created_at', Carbon::now()->month)->count();

        // Get today's appointments and completed ones
        $todayAppointments = Appointment::whereDate('appointment_date', Carbon::today())->count();
        $completedAppointments = Appointment::whereDate('appointment_date', Carbon::today())
            ->where('status', 'completed')
            ->count();

        // Get medicine inventory stats
        $availableMedicine = Medicine::where('quantity', '>', 0)->count();
        $lowStockMedicine = Medicine::where('quantity', '<=', DB::raw('reorder_level'))->count();

        // Get current queue information
        $currentQueue = Queue::where('status', 'waiting')
            ->whereDate('created_at', Carbon::today())
            ->count();
        
        // Calculate average wait time (in minutes)
        $avgWaitTime = Queue::whereDate('created_at', Carbon::today())
            ->whereNotNull('completed_at')
            ->select(DB::raw('AVG(TIMESTAMPDIFF(MINUTE, created_at, completed_at)) as avg_wait_time'))
            ->first();
        $avgWaitTime = $avgWaitTime->avg_wait_time ? round($avgWaitTime->avg_wait_time) . 'm' : '0m';

        // Get upcoming appointments
        $appointments = Appointment::with('patient')
            ->whereDate('appointment_date', '>=', Carbon::today())
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->take(5)
            ->get()
            ->map(function ($appointment) {
                return [
                    'patient_name' => $appointment->patient->full_name,
                    'service' => $appointment->service_type,
                    'time' => Carbon::parse($appointment->appointment_time)->format('h:i A'),
                    'date' => Carbon::parse($appointment->appointment_date)->format('M d, Y'),
                    'status' => $appointment->status
                ];
            });

        // Get current queue list
        $queue = Queue::with('patient')
            ->whereDate('created_at', Carbon::today())
            ->where('status', '!=', 'completed')
            ->orderBy('queue_number')
            ->take(5)
            ->get()
            ->map(function ($queueItem) {
                $waitTime = Carbon::parse($queueItem->created_at)->diffForHumans(null, true);
                return [
                    'name' => $queueItem->patient->full_name,
                    'queue_number' => $queueItem->queue_number,
                    'wait_time' => $waitTime,
                    'status' => $queueItem->status
                ];
            });

        // Get user information
        $user = auth()->user();
        $healthCenterName = "Barangay Calumpang Health Center";
        $userFullName = $user->name;
        $userRole = $user->role;
        $notificationCount = $user->unreadNotifications->count();

        return view('dashboard.index', compact(
            'totalPatients',
            'newPatients',
            'todayAppointments',
            'completedAppointments',
            'availableMedicine',
            'lowStockMedicine',
            'currentQueue',
            'avgWaitTime',
            'appointments',
            'queue',
            'healthCenterName',
            'userFullName',
            'userRole',
            'notificationCount'
        ));
    }

    public function getStats()
    {
        // Method for fetching real-time stats via AJAX if needed
        $stats = [
            'totalPatients' => Patient::count(),
            'todayAppointments' => Appointment::whereDate('appointment_date', Carbon::today())->count(),
            'availableMedicine' => Medicine::where('quantity', '>', 0)->count(),
            'currentQueue' => Queue::where('status', 'waiting')->whereDate('created_at', Carbon::today())->count(),
        ];

        return response()->json($stats);
    }

    public function getQueueUpdates()
    {
        // Method for real-time queue updates via AJAX if needed
        $queue = Queue::with('patient')
            ->whereDate('created_at', Carbon::today())
            ->where('status', '!=', 'completed')
            ->orderBy('queue_number')
            ->take(5)
            ->get()
            ->map(function ($queueItem) {
                $waitTime = Carbon::parse($queueItem->created_at)->diffForHumans(null, true);
                return [
                    'name' => $queueItem->patient->full_name,
                    'queue_number' => $queueItem->queue_number,
                    'wait_time' => $waitTime,
                    'status' => $queueItem->status
                ];
            });

        return response()->json(['queue' => $queue]);
    }

    public function getAppointmentUpdates()
    {
        // Method for real-time appointment updates via AJAX if needed
        $appointments = Appointment::with('patient')
            ->whereDate('appointment_date', '>=', Carbon::today())
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->take(5)
            ->get()
            ->map(function ($appointment) {
                return [
                    'patient_name' => $appointment->patient->full_name,
                    'service' => $appointment->service_type,
                    'time' => Carbon::parse($appointment->appointment_time)->format('h:i A'),
                    'date' => Carbon::parse($appointment->appointment_date)->format('M d, Y'),
                    'status' => $appointment->status
                ];
            });

        return response()->json(['appointments' => $appointments]);
    }
} 