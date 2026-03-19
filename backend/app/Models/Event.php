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
        'entry_fee'
    ];

    // 🖼️ Image-ku Full URL kidaikka intha Accessor
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        // Path: public/upload/events/
        return URL::to('/') . '/upload/events/' . $this->image;
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
