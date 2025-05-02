<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class program_types extends Model
{
    //
    protected $fillable = [
        'programname',
        'description',
                'created_at',
                'updated_at'
    ];
}