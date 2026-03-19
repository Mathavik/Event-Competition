<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

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
        $event = Event::findOrFail($request->event_id);

        // 🔥 ================= TEAM EVENT =================
        if ($event->type === 'Team') {

            if (!$request->members || count($request->members) == 0) {
                return response()->json([
                    'message' => 'Members required for team event'
                ], 400);
            }

            foreach ($request->members as $studentId) {

                $student = Student::findOrFail($studentId);

                // ✅ Max 5 events per student
                $count = DB::table('event_student')
                    ->where('student_id', $studentId)
                    ->count();

                if ($count >= 5) {
                    return response()->json([
                        'message' => 'Max 5 events only for student ' . $studentId
                    ], 400);
                }

                // ✅ Time clash
                $exists = DB::table('event_student')
                    ->where('student_id', $studentId)
                    ->where('event_time', $request->event_time)
                    ->exists();

                if ($exists) {
                    return response()->json([
                        'message' => 'Time clash for student ' . $studentId
                    ], 400);
                }

                // ✅ Age check
                $allowed = explode(',', $event->age_group);

                if (!in_array('All Ages', $allowed)) {
                    $valid = false;

                    foreach ($allowed as $group) {
                        if ($group == 'U16' && $student->age <= 16) $valid = true;
                        if ($group == 'U18' && $student->age <= 18) $valid = true;
                        if ($group == 'U19' && $student->age <= 19) $valid = true;
                    }

                    if (!$valid) {
                        return response()->json([
                            'message' => 'Student ' . $studentId . ' not eligible'
                        ], 400);
                    }
                }

                // ✅ School rule
                $alreadyExists = DB::table('event_student')
                    ->join('students', 'event_student.student_id', '=', 'students.id')
                    ->where('event_student.event_id', $event->id)
                    ->where('students.school_code', $student->school_code)
                    ->exists();

                if ($alreadyExists) {
                    return response()->json([
                        'message' => 'Only one student per school allowed'
                    ], 400);
                }

                // ✅ INSERT
                DB::table('event_student')->insert([
                    'student_id' => $studentId,
                    'event_id' => $event->id,
                    'event_time' => $request->event_time,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            return response()->json([
                'message' => 'Team Registered Successfully'
            ]);
        }

        // 🔥 ================= SOLO EVENT =================

        $student = Student::findOrFail($request->student_id);

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

        // School rule
        $alreadyExists = $event->students()
            ->where('school_code', $student->school_code)
            ->exists();

        if ($alreadyExists) {
            return response()->json([
                'message' => 'Only one student per school allowed in this event'
            ], 400);
        }

        // Attach
        $student->events()->attach($event->id, [
            'event_time' => $request->event_time
        ]);

        return response()->json([
            'message' => 'Registered successfully'
        ], 200);
    }
}