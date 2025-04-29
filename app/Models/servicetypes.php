<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class servicetypes extends Model
{
    //
    protected $primaryKey = 'id';
    public function subservices(){
        return $this->hasMany(subservices::class,'service_id','id');
    }

    public function servicedays(){
        return $this->hasMany(service_days::class,'service_id','id');
    }
}
