<?php

namespace App\Models;
use App\Models\servicetypes;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class appointments extends Model
{
    //
    protected $table = 'appointments'; // Explicit table name if needed

    protected $fillable = [
        'user_id',
        'phone',
        'date',
        'time',
        'servicetype_id',
        'notes'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function service(){
        return $this->belongsTo(servicetypes::class,'servicetype_id');
    }
}
