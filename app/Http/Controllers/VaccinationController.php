<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VaccineSchedule;
use App\Models\VaccineRecord;

class VaccinationController extends Controller
{
    public function index()
    {
        $schedules = VaccineSchedule::all()->map(function($schedule) {
            return [
                'id' => $schedule->id,
                'name' => $schedule->name,
                'date' => $schedule->date,
                'time' => $schedule->time,
                'location' => $schedule->location,
                'age_group' => $schedule->age_group,
                'available_slots' => $schedule->available_slots,
                'total_slots' => $schedule->total_slots,
                'status' => $schedule->status
            ];
        });

        $records = VaccineRecord::where('user_id', auth()->id())
            ->get()
            ->map(function($record) {
                return [
                    'id' => $record->id,
                    'name' => $record->name,
                    'date' => $record->date,
                    'vaccine_type' => $record->vaccine_type,
                    'dose_number' => $record->dose_number,
                    'next_dose_date' => $record->next_dose_date,
                    'administered_by' => $record->administered_by,
                    'status' => $record->status
                ];
            });
        
        return view('Landing.Services.Vaccinations', compact('schedules', 'records'));
    }

    public function getSchedulesByDate(Request $request)
    {
        $date = $request->date;
        $schedules = VaccineSchedule::whereDate('date', $date)->get();
        return response()->json($schedules);
    }
}