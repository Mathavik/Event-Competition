<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Event;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class EventRegistrationsController extends Controller
{
    public function showEvents($id)
    {
        $student = Student::findOrFail($id);
        $events = Event::all();

        return view('events', compact('student', 'events'));
    }

public function registerEvent(Request $request)
{
    $event = Event::findOrFail($request->event_id);

    // ================= TEAM EVENT =================
    if ($event->type === 'Team') {

        if (!$request->members || count($request->members) == 0) {
            return response()->json([
                'message' => 'Members required for team event'
            ], 400);
        }

        $errors = [];

        foreach ($request->members as $studentId) {

            $student = Student::findOrFail($studentId);

            // Max 5 events
            $count = DB::table('event_student')
                ->where('student_id', $studentId)
                ->count();

            if ($count >= 5) {
                $errors[] = "Student $studentId: Max 5 events only";
            }

            // Time clash
            $exists = DB::table('event_student')
                ->where('student_id', $studentId)
                ->where('event_time', $request->event_time)
                ->exists();

            if ($exists) {
                $errors[] = "Student $studentId: Time clash";
            }

            // Age check
            $allowed = array_map('trim', explode(',', $event->age_group));

            if (!in_array('All Ages', $allowed)) {
                $valid = false;

                foreach ($allowed as $group) {
                    if ($group == 'U16' && $student->age <= 16) $valid = true;
                    if ($group == 'U18' && $student->age <= 18) $valid = true;
                    if ($group == 'U19' && $student->age <= 19) $valid = true;
                }

                if (!$valid) {
                    $errors[] = "Student $studentId: Not eligible";
                }
            }

            // School rule
            $alreadyExists = DB::table('event_student')
                ->join('students', 'event_student.student_id', '=', 'students.id')
                ->where('event_student.event_id', $event->id)
                ->where('students.school_code', $student->school_code)
                ->exists();

            if ($alreadyExists) {
                $errors[] = "Student $studentId: Only one per school allowed";
            }
        }

        // 🔥 RETURN ALL ERRORS
        if (!empty($errors)) {
            return response()->json([
                'message' => implode(', ', $errors),
                'errors' => $errors
            ], 400);
        }

        DB::beginTransaction();

        try {
            $created = [];

            foreach ($request->members as $studentId) {

                $eventStudentId = DB::table('event_student')->insertGetId([
                    'student_id' => $studentId,
                    'event_id' => $event->id,
                    'event_name' => $event->name,
                    'event_time' => $request->event_time,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                $created[] = [
                    'student_id' => $studentId,
                    'event_student_id' => $eventStudentId
                ];
            }

            DB::commit();

            return response()->json([
                'message' => 'Team registered successfully',
                'data' => $created,
                'event_name' => $event->name,
                'amount' => $request->amount ?? 100.00
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Team registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ================= SOLO EVENT =================

    $student = Student::findOrFail($request->student_id);
    $errors = [];

    // Max 5 events
    if ($student->events()->count() >= 5) {
        $errors[] = 'Max 5 events only';
    }

    // Time clash
    $exists = $student->events()
        ->wherePivot('event_time', $request->event_time)
        ->exists();

    if ($exists) {
        $errors[] = 'Time clash!';
    }

    // Age check
    $allowed = array_map('trim', explode(',', $event->age_group));

    if (!in_array('All Ages', $allowed)) {
        $valid = false;

        foreach ($allowed as $group) {
            if ($group == 'U16' && $student->age <= 16) $valid = true;
            if ($group == 'U18' && $student->age <= 18) $valid = true;
            if ($group == 'U19' && $student->age <= 19) $valid = true;
        }

        if (!$valid) {
            $errors[] = 'Not eligible';
        }
    }

    // School rule
    $alreadyExists = $event->students()
        ->where('school_code', $student->school_code)
        ->exists();

    if ($alreadyExists) {
        $errors[] = 'Only one student per school allowed';
    }

    // 🔥 RETURN ALL ERRORS
    if (!empty($errors)) {
        return response()->json([
            'message' => implode(', ', $errors),
            'errors' => $errors
        ], 400);
    }

    DB::beginTransaction();

    try {
        $eventStudentId = DB::table('event_student')->insertGetId([
            'student_id' => $student->id,
            'event_id' => $event->id,
            'event_name' => $event->name,
            'event_time' => $request->event_time,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::commit();

        return response()->json([
            'message' => 'Registered successfully',
            'event_student_id' => $eventStudentId,
            'event_name' => $event->name,
            'amount' => $request->amount ?? 100.00
        ], 200);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => 'Registration failed',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function checkRegistration(Request $request)
{
    $studentId = $request->student_id;
    $eventId = $request->event_id;

    $registration = DB::table('event_student')
        ->where('student_id', $studentId)
        ->where('event_id', $eventId)
        ->first();

    return response()->json([
        'student_id' => $studentId,
        'event_id' => $eventId,
        'registered' => !!$registration,
        'registration' => $registration
    ]);
}

public function getSchools()
{
    $schools = DB::table('event_student')
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->select('students.school_name')
        ->distinct()
        ->pluck('school_name');

    return response()->json($schools);
}

public function getEventsBySchool($school)
{
    $events = DB::table('event_student')
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->join('events', 'event_student.event_id', '=', 'events.id')
        ->where('students.school_name', $school)
        ->select('events.id', 'events.name')
        ->distinct()
        ->get();

    return response()->json($events);
}
public function getStudentsByEvent($eventId)
{
    $students = DB::table('event_student')
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->where('event_student.event_id', $eventId)
        ->select('students.name', 'students.id')
        ->get();

    return response()->json($students);
}


public function downloadCertificate($eventId, $school)
{
    $students = DB::table('event_student')
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->join('events', 'event_student.event_id', '=', 'events.id')
        ->where('event_student.event_id', $eventId)
        ->where('students.school_name', $school)
        ->select(
            'students.name as student_name',
            'events.name as event_name',
            'events.event_date as event_date'
        )
        ->get();

    $pdf = Pdf::loadView('pdf.participationCertificate', compact('students'));

    return $pdf->download('participation_certificates.pdf');
}
}