<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
//use App\Models\Appointment;
use App\Models\appointments;
use Exception;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Events\SendNotification;
use App\Notifications\SystemNotification;
use App\Services\ActivityLogger;
use App\Services\NotifSender;
use Illuminate\Support\Facades\Auth;
class AppointmentsController extends Controller
{
    //
    public function index(){
        $appointments = appointments::paginate(10);
        $appointments->load('user');
        $appointments->load('service');
        return Inertia::render('Authenticated/Admin/Appointments',[
            'Appoints' => $appointments->items(),
            'appointments_' => $appointments
        ]);
    }
    public function history(){
        return Inertia::render('Authenticated/Admin/Appointments/AppointmentHistory',[
            // 'Appoints' => $appointments
        ]);
    }
    public function GetAppointment(appointments $appointment){
        $appointment->load(['user','service']);
        return response()->json($appointment);
    }

    public function UpdateStatus(Request $request, appointments $appointment){
        $request->validate([
            'status' => 'required|in:1,2,3,4'
        ]);

        //dd($appointment);
        try{
            DB::beginTransaction();

            $appointment->update([
                'status' => $request->status
            ]);

            DB::commit();
        }
        catch(\Exception $er){
            DB::rollBack();
        }
    }

    public function reschedule(Request $request, appointments $appointment){
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:h:i A',
        ]);
        try{
            DB::beginTransaction();

                $date = \Carbon\Carbon::parse( $request->date)->format('Y-m-d');
                $time = \Carbon\Carbon::parse($request->time)->format('H:i:s');
                $appointment->update([
                    'date' => $date,
                    'time' => $time,
                ]);

                ActivityLogger::log("User {Auth::user()->id} rescheduled an appointment",$appointment,['ip' => $request->ip()]);
                // $recipients = User::whereIn('roleID', [1,7])->get();
                // foreach ($recipients as $recipient) {
                //     $recipient->notify(new SystemNotification(
                //         "{Auth::user()->firstname} {Auth::user()->lastname} ({Auth::user()->role->roletype}) Rescheduled patient's appointment. ",
                //         'Appointment Rescheduled!',
                //         'appointment_resched'
                //     ));
                //     event(new SendNotification($recipient->id));
                // }
                $user = Auth::user();
                $mssg_forAdmins = "{$user->firstname} {$user->lastname} ({$user->role->roletype}) Rescheduled patient's appointment. ";
                NotifSender::SendNotif(false,[1,7],$mssg_forAdmins,
                'Appointment Rescheduled!','appointment_resched');

                NotifSender::SendNotif(true,[$appointment->user_id],"{$user->firstname} {$user->lastname} ({$user->role->roletype}) Rescheduled your appointment to {$date} {$time}",
                'Appointment Rescheduled!','appointment_resched');
            DB::commit();
        }
        catch(\Exception $er){
            DB::rollBack();
        }
    }
}