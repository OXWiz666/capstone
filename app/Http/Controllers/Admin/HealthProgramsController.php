<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\program_schedules;
use App\Models\program_types;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class HealthProgramsController extends Controller
{
    //
    public function index(){
        return Inertia::render("Authenticated/Admin/HealthPrograms",[]);
    }

    public function CreateProgram(Request $request){
        $request->validate([
            'programname' => "required|min:3",
            'description' => "required|min:3",
            'date' => "required|date",
            'starttime' => "required",
            'endtime' => "required",
            'location' => "required",
            'slots' => "required|integer",
            'coordinatorid' => "required|exists:users,id",
            'status' => "required|in:Available,Full,Cancelled",
        ]);

        try{
            DB::beginTransaction();

            $type = program_types::create([
                'programname' => $request->programname,
                'description' => $request->description,
            ]);



            $asd = program_schedules::create([
                'program_type_id' => $type->id,
                'date' => $request->date,
                'start_time' => $request->starttime,
                'end_time' => $request->endtime,
                'location' => $request->location,
                'total_slots' => $request->slots,
                'available_slots' => $request->slots,
                'status' => $request->status
            ]);

            DB::commit();
        }
        catch(\Exception $er){
            DB::rollBack();
        }
    }
}
