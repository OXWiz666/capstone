<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class doctor_details extends Model
{
    //

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function specialty(){
        return $this->belongsTo(doctor_specialties::class,'specialty_id');
    }

    public function department(){
        return $this->belongsTo(doctor_departments::class,'department_id');
    }
}