<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{

    // GET all events
    public function index()
    {
        $events = Event::with('category')->get();
        return response()->json($events);
    }


    // CREATE new event
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required',
            'type' => 'required',
            'age_group' => 'required'
        ]);

        $event = Event::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'type' => $request->type,
            'age_group' => $request->age_group
        ]);

        return response()->json([
            'message' => 'Event created successfully',
            'data' => $event
        ]);
    }
}