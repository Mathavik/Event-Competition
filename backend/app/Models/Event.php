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
        'image'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return URL::to('/') . '/upload/events/' . $this->image;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

public function students()
{
    return $this->belongsToMany(Student::class)
                ->withPivot('event_name', 'payment_ref_id', 'event_time')
                ->withTimestamps();
}
}