<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\service_days;
use App\Models\servicetypes;
use App\Models\subservice_time;
use App\Models\subservices;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ServicesController extends Controller
{
    //

    public function index(){ // Overview
        return Inertia::render('Authenticated/Admin/Services/Overview',[

        ]);
    }

    public function services(){


        $services = servicetypes::with(['subservices','servicedays'])->get();
        $services->load('subservices.times');
        return Inertia::render('Authenticated/Admin/Services/Services',[
            'services_' => $services
        ]);
    }

    public function createSubService(Request $request){

        $request->validate([
            'serviceid' => 'required|exists:servicetypes,id',
            'subservicename'
        ]);

        subservices::insert([
            'service_id' => $request->serviceid,
            'subservicename' => $request->subservicename
        ]);

    }

    public function saveDays(Request $request){
        $request->validate([
            'days' => 'array',
            'days.*' => 'in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'serviceid' => 'required|exists:servicetypes,id'
        ]);


        try{
            DB::beginTransaction();

            service_days::where('service_id',$request->serviceid)->delete();

            foreach($request->days as $day){
                service_days::insert([
                    'service_id' => $request->serviceid,
                    'day' => $day
                ]);
            }


            DB::commit();
        }
        catch(\Exception $er){
            DB::roleback();
        }

    }

    public function saveTime(Request $request){
        $request->validate([
            'times' => 'array',
            'times.*' => 'date_format:h:i A',
            'subservice_id' => 'required|exists:subservices,id'
        ]);

        try{
            DB::beginTransaction();

            subservice_time::where('subservice_id',$request->subservice_id)->delete();


            foreach ($request->times as $timeStr) {
            // Convert "11:30 AM" to "11:30:00"
            $time24hr = date('H:i:s', strtotime($timeStr));

            subservice_time::insert([
                'subservice_id' => $request->subservice_id,
                'time' => $time24hr // Now in 24-hour format
            ]);
        }
            DB::commit();
        }
        catch(\Exception $er){
            DB::rollBack();
        }

    }
}
