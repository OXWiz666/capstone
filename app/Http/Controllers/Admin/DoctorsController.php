<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\doctor_details;
use App\Models\securityquestions;
use App\Models\User;
use Illuminate\Http\Request;

use Inertia\Inertia;
class DoctorsController extends Controller
{
    //
    public function index(){
        $doctors = doctor_details::with(['user','specialty','department'])->get();
        $questions = securityquestions::get();
        return Inertia::render("Authenticated/Admin/Doctors/Doctors",[
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
    public function updateStatus(Request $request,$id)
    {
        try {
            // Log the received data for debugging
            // \Log::info('Status update request received', [
            //     'id' => $id,
            //     'status' => $request->input('status'),
            //     'all_data' => $request->all()
            // ]);

            $request->validate([
                'status' => 'required|between:1,4',
            ]);

            $doctor = doctor_details::findOrFail($id);
            $doctor->status = $request->input('status');
            $doctor->save();

            // \Log::info('Doctor status updated successfully', [
            //     'id' => $id,
            //     'new_status' => $doctor->status
            // ]);
        } catch (\Exception $e) {
            // \Log::error('Error updating doctor status', [
            //     'id' => $id,
            //     'error' => $e->getMessage(),
            //     'trace' => $e->getTraceAsString()
            // ]);

            // return back()->with('flash', [
            //     'title' => 'Error!',
            //     'message' => 'Failed to update doctor status: ' . $e->getMessage(),
            //     'icon' => 'error'
            // ]);
        }
    }
}
