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
            'amount' => 'nullable|numeric'
        ]);

        DB::beginTransaction();

        try {
            // team create
            $teamId = DB::table('teams')->insertGetId([
                'event_id' => $request->event_id,
                'captain_id' => $request->captain_id,
                'team_name' => $request->team_name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // event_student registration create
            $eventStudentId = DB::table('event_student')->insertGetId([
                'student_id' => $request->captain_id,
                'event_id' => $request->event_id,
                'team_id' => $teamId,
                'payment_ref_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $event = DB::table('events')->where('id', $request->event_id)->first();

            DB::commit();

            return response()->json([
                'message' => 'Team created successfully',
                'team_id' => $teamId,
                'team_name' => $request->team_name,
                'event_student_id' => $eventStudentId,
                'event_name' => $event->name ?? null,
                'amount' => $request->amount ?? ($event->entry_fee ?? 0),
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