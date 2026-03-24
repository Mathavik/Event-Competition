<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
 public function store(Request $request)
{
    $request->validate([
        'event_id' => 'required|exists:events,id',
        'captain_id' => 'required|exists:students,id',
        'team_name' => 'required|string|max:255',
    ]);

    DB::beginTransaction();

    try {
        // ✅ GET event from DB
        $event = DB::table('events')
            ->where('id', $request->event_id)
            ->first();

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }

        // ✅ INSERT with event_name
        $teamId = DB::table('teams')->insertGetId([
            'event_id' => $request->event_id,
            'event_name' => $event->name, // 🔥 FIX
            'captain_id' => $request->captain_id,
            'team_name' => $request->team_name,
              'members' => json_encode([]), 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ✅ event_student
        $eventStudentId = DB::table('event_student')->insertGetId([
            'student_id' => $request->captain_id,
            'event_id' => $request->event_id,
            'team_id' => $teamId,
              'event_name' => $event->name, // ✅ FIX
              'event_time' => now(), // ✅ (or use actual event time)
            'payment_ref_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::commit();

        return response()->json([
            'message' => 'Team created successfully',
            'team_id' => $teamId,
            'team_name' => $request->team_name,
            'event_student_id' => $eventStudentId,
            'event_name' => $event->name,
            'amount' => $event->entry_fee ?? 0,
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => 'Team creation failed',
            'error' => $e->getMessage()
        ], 500);
    }
}
}