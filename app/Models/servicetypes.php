<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class servicetypes extends Model
{
    //
    protected $primaryKey = 'id';
    public function subservices(){
        return $this->hasMany(servicetypes::class,'id','service_id');
    }
}
