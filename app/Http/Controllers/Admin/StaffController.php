<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\doctor_details;
use App\Models\securityquestions;
use App\Models\User;
use App\Services\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use App\Notifications\SystemNotification;
use App\Events\SendNotification;
use App\Models\doctor_status;

class StaffController extends Controller
{
    //
    public function index(){

        $staff = User::whereNot('roleID','5')->get();
        $admins = User::where('roleID','7')->get();
        $doctors = User::where('roleID','1')->get();
        $pharmacists = User::where('roleID','6')->get();
        return Inertia::render("Authenticated/Admin/Staff/Overview",[
            'staffcount' => $staff->count(),
            'admincount' => $admins->count(),
            'pharmacistcount' => $pharmacists->count(),
            'doctorscount' => $doctors->count(),
        ]);
    }
    public function doctors(){
        $doctors = doctor_details::with(['user','specialty','department'])->paginate(10);
        $questions = securityquestions::get();
        return Inertia::render("Authenticated/Admin/Staff/Doctors",[
            'doctorsitems' => $doctors->items(),
            'doctors' => $doctors,
            'questions' => $questions
        ]);
    }

    /**
     * Update the doctor's status
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateStatus(Request $request, doctor_details $doctor)
    {
    try {
        DB::beginTransaction();

        $request->validate([
            'status' => 'required|integer|between:1,4',
        ]);

        // Get old status value (integer)
        $oldStatus = $doctor->status;
        //dd($doctor);
        // Update doctor status
        $doctor->update(['status' => $request->status]);

        //Get status names (assuming you have a Status model)
        $oldStatusName = doctor_status::find($oldStatus)->statusname;
        $newStatusName = doctor_status::find($request->status)->statusname;

        // Get current user's role
        $userRole = Auth::user()->role->roletype;

        // Prepare notification message
        $message = "{$userRole} has updated Dr. {$doctor->user->lastname}'s status from {$oldStatusName} to {$newStatusName}";

        // Log activity
        ActivityLogger::log($message, $doctor, ['ip' => request()->ip()]);

        // Notify relevant users (roles 1 and 7)
        $recipients = User::whereIn('roleID', [1, 7])->get();

        foreach ($recipients as $recipient) {
            $notification = new SystemNotification(
                $message,
                "A doctor status updated to {$newStatusName}!",
                "doctorstatus_update",
                "#" // Consider using a proper URL here
            );

            $recipient->notify($notification);
            event(new SendNotification($recipient->id));
        }

        DB::commit();

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Status updated successfully',
        //     'new_status' => $newStatusName,
        // ]);

    } catch (\Exception $e) {
        DB::rollBack();

        //Log::error("Failed to update doctor status: " . $e->getMessage());

        // return response()->json([
        //     'success' => false,
        //     'message' => 'Failed to update status',
        //     'error' => config('app.debug') ? $e->getMessage() : null,
        // ], 500);
    }
}
}