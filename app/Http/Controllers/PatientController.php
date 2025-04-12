<?php

namespace App\Http\Controllers;

use App\Models\appointments;
use App\Models\servicetypes;
use App\Notifications\SystemNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\User;
use App\Services\ActivityLogger;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class PatientController extends Controller
{
    //
    public function profile(){
        return Inertia::render("Authenticated/Patient/ProfilePage",[]);
        //return view('patient.profie');
    }


    public function update(Request $request){
        $cred = $request->validate([
            'firstname' => 'required|min:3',
            'lastname' => 'required|min:3',
            'email' => [
                'required',
                'min:3',
                Rule::unique('users')->ignore(Auth::user()->id)
            ] ,
            'phone' => [
                'required',
                'min:11',
                'numeric',
                Rule::unique('users', 'contactno')->ignore(Auth::user()->id,'id')
            ],
            'address' => 'required|min:3',
            'birthdate' => 'required',
            'bloodType' => 'required|min:1',
            'gender' => "required|in:M,F"
        ]);

        User::where('id',Auth::user()->id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'contactno' => $request->phone,
            'address' => $request->address,
            'birth' => $request->birthdate,
            'bloodtype' => $request->bloodType,
            'gender' => $request->gender
        ]);
    }

    public function medicalrecords(){

        return Inertia::render("Authenticated/Patient/MedicalRecordsPage",[]);
    }

    public function appointments(){
        $serv = servicetypes::get();
        return Inertia::render('Authenticated/Patient/Appointments/Appointment',[
            'services' => $serv,
            'ActiveTAB' => 'appointment'
        ]);
    }
    public function appointmentshistory(){
        $appointments =
        appointments::with(['service','user'])
        ->where('user_id',Auth::user()->id)->orderByDesc('created_at')->paginate(5);

        return Inertia::render('Authenticated/Patient/Appointments/AppointmentHistory',[
            'appointments' => $appointments,
            'ActiveTAB' => 'History'
        ]);
    }
    public function storeAppointment(Request $request){
        $request->validate([
            'phone' => 'required|min:10',
            'date' => 'required|date',
            'time' => 'required|date_format:h:i A',
            'service' => 'required|exists:servicetypes,id',
            'notes' => 'required|min:10'
        ]);
        //dd($request);
        try{
            DB::beginTransaction();

                $appoint = appointments::create([
                    'user_id' => Auth::user()->id,
                    'phone' => $request->phone,
                    'date' => \Carbon\Carbon::parse( $request->date)->format('Y-m-d'),
                    'time' => \Carbon\Carbon::parse($request->time)->format('H:i:s'),
                    'servicetype_id' => $request->service,
                    'notes' => $request->notes,
                ]);

                if($appoint){
                    $appoint->load(['service','user','user.role']);
                    $message = "Scheduled {$appoint->service->servicename} at {$appoint->date} {$appoint->time}.";

                    //dd($message);

                    ActivityLogger::log($message . " ({$appoint->user->firstname} {$appoint->user->lastname})",$appoint,
                    ['ip' => $request->ip()]);

                    $recipients = User::where('roleID', '7')->orWhere('roleID','1')->get();

                    foreach($recipients as $recipient){
                        $recipient->notify(new SystemNotification(
                            $message,
                                "{$appoint->user->firstname} {$appoint->user->lastname} ({$appoint->user->role->roletype})",
                            "new_appointment",
                            "#"
                        ));
                    }
                }

            DB::commit();

            //return response()->noContent();
        }
        catch(\Exception $er){

            //dd($er);
            DB::rollBack();

            //Log::error("Appointment creation failed: " . $e->getMessage());
            //return redirect()->back()->with('error', 'Failed to create appointment');
        }
    }
}
