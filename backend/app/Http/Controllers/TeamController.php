<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function registerTeam(Request $request)
    {
        // ✅ VALIDATION
        if (!$request->team_name || !is_array($request->members)) {
            return response()->json([
                'message' => 'Team name & members required'
            ], 400);
        }

        // ✅ remove captain from members (avoid duplicate)
        $members = array_unique($request->members);
        $members = array_filter($members, function ($id) use ($request) {
            return $id != $request->captain_id;
        });

        // ✅ CREATE TEAM
        $teamId = DB::table('teams')->insertGetId([
            'event_id' => $request->event_id,
            'captain_id' => $request->captain_id,
            'team_name' => $request->team_name,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // ✅ ADD CAPTAIN
        DB::table('team_members')->insert([
            'team_id' => $teamId,
            'student_id' => $request->captain_id,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // ✅ ADD MEMBERS
        foreach ($members as $member) {
            DB::table('team_members')->insert([
                'team_id' => $teamId,
                'student_id' => $member,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        return response()->json([
            'message' => 'Team Registered Successfully'
        ]);
    }
}