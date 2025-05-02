<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class program_schedules extends Model
{
    //

    protected $fillable = [
        'program_type_id',
                'date',
                'start_time',
                'end_time',
                'location',
                'total_slots',
                'available_slots',
                'status',
                'created_at',
                'updated_at'
    ];
}
