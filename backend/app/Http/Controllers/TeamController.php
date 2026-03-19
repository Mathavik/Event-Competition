<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Event;

class TeamController extends Controller
{
    public function registerTeam(Request $request)
    {
        // ✅ validation
        if (!$request->team_name || !is_array($request->members)) {
            return response()->json([
                'message' => 'Team name & members required'
            ], 400);
        }

        // ✅ get event
        $event = Event::findOrFail($request->event_id);

        // ✅ remove empty names
        $members = array_filter($request->members);

        // ✅ store directly in teams table
        DB::table('teams')->insert([
            'event_id' => $request->event_id,
            'event_name' => $event->name, // 🔥 store event name
            'captain_id' => $request->captain_id,
            'team_name' => $request->team_name,

            // 🔥 JSON store
            'members' => json_encode($members),

            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json([
            'message' => 'Team Registered Successfully'
        ]);
    }
}