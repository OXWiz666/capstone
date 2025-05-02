<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        // Get patient registration data by month for the current year
        $currentYear = date('Y');
        $patientsByMonth = [];
        
        // Get all patients created this year
        $patientsThisYear = Patient::whereYear('created_at', $currentYear)->get();
        
        // Group them by month
        foreach ($patientsThisYear as $patient) {
            $month = $patient->created_at->format('n'); // 1-12
            if (!isset($patientsByMonth[$month])) {
                $patientsByMonth[$month] = 0;
            }
            $patientsByMonth[$month]++;
        }
        
        // Fill in missing months with zero
        $patientRegistrationsByMonth = [];
        for ($i = 1; $i <= 12; $i++) {
            $patientRegistrationsByMonth[$i] = $patientsByMonth[$i] ?? 0;
        }

        // Get patient registration data by week for the current month
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        
        $patientRegistrationsByWeek = [0, 0, 0, 0, 0]; // Initialize with 5 weeks
        
        // Get all patients created this month
        $patientsThisMonth = Patient::whereBetween('created_at', [$startOfMonth, $endOfMonth])->get();
        
        // Group them by week of month
        foreach ($patientsThisMonth as $patient) {
            $weekOfMonth = ceil($patient->created_at->format('j') / 7); // Simple week calculation (1-5)
            if ($weekOfMonth >= 1 && $weekOfMonth <= 5) {
                $patientRegistrationsByWeek[$weekOfMonth - 1]++;
            }
        }

        // Get patient registration data by day for the current week
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        
        $patientRegistrationsByDay = [0, 0, 0, 0, 0, 0, 0]; // Mon-Sun
        
        // Get all patients created this week
        $patientsThisWeek = Patient::whereBetween('created_at', [$startOfWeek, $endOfWeek])->get();
        
        // Group them by day of week (1=Monday, 7=Sunday)
        foreach ($patientsThisWeek as $patient) {
            $dayOfWeek = $patient->created_at->format('N'); // 1-7
            $patientRegistrationsByDay[$dayOfWeek - 1]++;
        }

        // Get patient registration data for today
        $startOfDay = Carbon::now()->startOfDay();
        $endOfDay = Carbon::now()->endOfDay();
        
        $patientRegistrationsByHour = array_fill(0, 12, 0); // 12 two-hour blocks
        
        // Get all patients created today
        $patientsToday = Patient::whereBetween('created_at', [$startOfDay, $endOfDay])->get();
        
        // Group them by hour (grouped by 2 hours)
        foreach ($patientsToday as $patient) {
            $hour = (int)$patient->created_at->format('G'); // 0-23
            $twoHourBlock = floor($hour / 2);
            if ($twoHourBlock < 12) {
                $patientRegistrationsByHour[$twoHourBlock]++;
            }
        }

        // Get total patients count
        $totalPatients = Patient::count();
        
        // Get patients registered in the last 30 days
        $lastMonth = Carbon::now()->subDays(30);
        $patientsLastMonth = Patient::where('created_at', '>=', $lastMonth)->count();
        
        // Calculate growth rate
        $previousMonth = Carbon::now()->subDays(60)->subDays(30);
        $patientsPreviousMonth = Patient::whereBetween('created_at', [$previousMonth, $lastMonth])->count();
        $growthRate = $patientsPreviousMonth > 0 
            ? round((($patientsLastMonth - $patientsPreviousMonth) / $patientsPreviousMonth) * 100, 1)
            : 0;

        return Inertia::render("Authenticated/Admin/Reports", [
            'patientData' => [
                'yearly' => array_values($patientRegistrationsByMonth),
                'monthly' => array_values($patientRegistrationsByWeek),
                'weekly' => array_values($patientRegistrationsByDay),
                'daily' => array_values($patientRegistrationsByHour),
                'stats' => [
                    'total' => $totalPatients,
                    'recent' => $patientsLastMonth,
                    'growth' => $growthRate
                ]
            ]
        ]);
    }
}
