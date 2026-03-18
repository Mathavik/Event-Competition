<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Event;

class EventRegistrationsController extends Controller
{
    public function showEvents($id)
    {
        $student = Student::findOrFail($id);
        $events = Event::all();

        return view('events', compact('student','events'));
    }

   public function registerEvent(Request $request)
{
    $student = Student::findOrFail($request->student_id);
    $event = Event::findOrFail($request->event_id);

    // Max 5 events
    if ($student->events()->count() >= 5) {
        return response()->json(['message' => 'Max 5 events only'], 400);
    }

    // Time clash
    $exists = $student->events()
        ->wherePivot('event_time', $request->event_time)
        ->exists();

    if ($exists) {
        return response()->json(['message' => 'Time clash!'], 400);
    }

    // Age check
    $allowed = explode(',', $event->age_group);

    if (!in_array('All Ages', $allowed)) {
        $valid = false;

        foreach ($allowed as $group) {
            if ($group == 'U16' && $student->age <= 16) $valid = true;
            if ($group == 'U18' && $student->age <= 18) $valid = true;
            if ($group == 'U19' && $student->age <= 19) $valid = true;
        }

        if (!$valid) {
            return response()->json(['message' => 'Not eligible'], 400);
        }
    }

    // Attach event
    $student->events()->attach($event->id, [
        'event_time' => $request->event_time
    ]);

    return response()->json([
        'message' => 'Registered successfully'
    ], 200);
}
}