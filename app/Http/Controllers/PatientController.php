<?php

namespace App\Http\Controllers;

use App\Events\SendNotification;
use App\Models\appointments;
use App\Models\servicetypes;
use App\Models\subservices;
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
            'firstname' => 'required|min:2',
            'middlename' => 'required|min:2',
            'lastname' => 'required|min:2',
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
            // 'address' => 'required|min:3',
            'birthdate' => 'required',
            'gender' => "required|in:M,F"
        ]);

        $user = User::find(Auth::user()->id);
        if($user){
            $user->update([
                'firstname' => $request->firstname,
                'middlename' => $request->middlename,
                'lastname' => $request->lastname,
                'suffix' => $request->suffix,
                'email' => $request->email,
                'contactno' => $request->phone,
                'address' => $request->address,
                'birth' => $request->birthdate,
                'bloodtype' => $request->bloodtype,
                'gender' => $request->gender
            ]);
        }

        ActivityLogger::log("User updated profile information.",$user,['ip',request()->ip()]);
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

    public function GetSubServices(Request $request,$id){
        $subservices = subservices::where('service_id',$id)->get();
        return response()->json($subservices);
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
            'subservice' => 'required|exists:subservices,id'
            //'notes' => 'required|min:10'
        ]);
        //dd($request);
        try{
            DB::beginTransaction();

                // Get the latest priority number and increment it, or start from 1 if none exists
                $latestPriority = appointments::max('priorityNumber') ?? 0;
                $newPriorityNumber = $latestPriority + 1;

                $appoint = appointments::create([
                    'user_id' => Auth::user()->id,
                    'phone' => $request->phone,
                    'date' => \Carbon\Carbon::parse( $request->date)->format('Y-m-d'),
                    'time' => \Carbon\Carbon::parse($request->time)->format('H:i:s'),
                    'servicetype_id' => $request->service,
                    'priorityNumber' => $newPriorityNumber,
                    //'notes' => $request->notes,
                ]);

                if($appoint){
                    $appoint->load(['service','user','user.role']);
                    $time = \Carbon\Carbon::parse($appoint->time)->format('H:m A');
                    $message = "Scheduled {$appoint->service->servicename} at {$appoint->date} {$time}.";

                    //dd($message);

                    ActivityLogger::log($message . " ({$appoint->user->firstname} {$appoint->user->lastname})",$appoint,
                    ['ip' => $request->ip()]);

                    $recipients = User::whereIn('roleID', ['7','1'])->get();

                    foreach($recipients as $recipient){
                        $recipient->notify(new SystemNotification(
                            $message,
                                "{$appoint->user->firstname} {$appoint->user->lastname} ({$appoint->user->role->roletype})",
                            "new_appointment",
                            "#",
                            $appoint->id
                        ));

                        event(new SendNotification($recipient->id));
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
    
    /**
     * Get the latest appointment for the authenticated user with priority number
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLatestAppointment()
    {
        $latestAppointment = appointments::where('user_id', Auth::user()->id)
            ->whereNotNull('priorityNumber')
            ->orderBy('created_at', 'desc')
            ->first();
            
        if ($latestAppointment) {
            return response()->json([
                'priorityNumber' => $latestAppointment->priorityNumber,
                'date' => $latestAppointment->date,
                'time' => $latestAppointment->time,
                'status' => $latestAppointment->status
            ]);
        }
        
        // If no appointment with priority number exists, return a generated one
        return response()->json([
            'priorityNumber' => mt_rand(1000, 9999),
            'generated' => true
        ]);
    }
}
