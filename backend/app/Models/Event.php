<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Event extends Model
{
    protected $fillable = [
     'category_id',
    'name',
    'type',
    'age_group',
    'image',
    'entry_fee',
    'event_date',
    'start_time',
    'end_time'
    ];

    protected $appends = ['image_url', 'status']; // ✅ updated

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        return URL::to('/') . '/upload/events/' . $this->image;
    }

    // ✅ NEW FUNCTION
    public function getStatusAttribute()
    {
        if (!$this->time || !$this->event_date) return "upcoming";

        $eventDateTime = \Carbon\Carbon::parse($this->event_date . ' ' . $this->time);
        $now = \Carbon\Carbon::now();

        if ($now->lt($eventDateTime)) {
            return 'upcoming';
        } elseif ($now->between($eventDateTime, $eventDateTime->copy()->addHour())) {
            return 'ongoing';
        } else {
            return 'completed';
        }
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class)
                    ->withPivot('event_time')
                    ->withTimestamps();
    }
}



