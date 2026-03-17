<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'type',
        'age_group',
        'image'
    ];

    // 🔗 Relation with Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // 🔗 Relation with Students (Many-to-Many)
    public function students()
    {
        return $this->belongsToMany(Student::class, 'event_registrations')
                    ->withPivot('event_time')
                    ->withTimestamps();
    }
}