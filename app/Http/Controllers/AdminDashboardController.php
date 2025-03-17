<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AdminDashboardController extends Controller
{
    /**
     * Display the dashboard page.
     *
     * @return \Illuminate\View\View
     */
    public function index(): View
    {
        // Get the authenticated user
        $user = Auth::user();
        
        // Sample data - in a real application, you would fetch this from your database
        $stats = [
            'patients' => 1248,
            'appointments_today' => 24,
            'medicine_inventory' => 156,
            'staff_members' => 18
        ];
        
        // You can pass any data needed for your dashboard
        return view('Dashboard.Admin.dashboard', [
            'stats' => $stats,
            'user' => $user
        ]);
    }
    
    /**
     * Get dashboard statistics as JSON for AJAX requests.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStats()
    {
        // Sample data - in a real application, you would fetch this from your database
        $stats = [
            'patients' => [
                'total' => 1248,
                'trend' => 12,
                'is_positive' => true
            ],
            'appointments' => [
                'today' => 24,
                'trend' => 8,
                'is_positive' => true
            ],
            'inventory' => [
                'total' => 156,
                'trend' => 3,
                'is_positive' => false
            ],
            'staff' => [
                'total' => 18,
                'trend' => 0,
                'is_positive' => true
            ]
        ];
        
        return response()->json($stats);
    }
    
    /**
     * Get queue updates for the dashboard.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getQueueUpdates()
    {
        // Sample data - in a real application, you would fetch this from your database
        $queue = [
            'current' => 5,
            'waiting' => 8,
            'completed' => 12
        ];
        
        return response()->json($queue);
    }
    
    /**
     * Get appointment updates for the dashboard.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAppointmentUpdates()
    {
        // Sample data - in a real application, you would fetch this from your database
        $appointments = [
            'today' => [
                'total' => 24,
                'completed' => 10,
                'upcoming' => 14
            ],
            'tomorrow' => [
                'total' => 18
            ],
            'this_week' => [
                'total' => 86
            ]
        ];
        
        return response()->json($appointments);
    }
}
