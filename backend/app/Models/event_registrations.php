<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['category_id','name','type','age_group'];

    public function students()
    {
        return $this->belongsToMany(Student::class, 'event_registrations');
    }
}