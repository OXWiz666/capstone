<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class subservices extends Model
{
    //

    public function service(){
        return $this->belongsTo(servicetypes::class,'service_id');
    }
}