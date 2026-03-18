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
        $student = Student::find($request->student_id);
        $event = Event::find($request->event_id);

        // Max 5 events
        if ($student->events()->count() >= 5) {
            return back()->with('error', 'Max 5 events only');
        }

        // Time clash
        $exists = $student->events()
            ->wherePivot('event_time', $request->event_time)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Time clash!');
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
                return back()->with('error', 'Not eligible');
            }
        }
        dd($student, $event);
        $student->events()->attach($event->id, [
            'event_time' => $request->event_time
        ]);

        return response()->json([
    'message' => 'Registered successfully'
], 200);
    }
}