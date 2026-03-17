<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'name','email','password','phone','gender',
        'dob','age','school_name','school_code','class','city'
    ];

    protected $hidden = ['password'];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_registrations')
                    ->withPivot('event_time');
    }
}