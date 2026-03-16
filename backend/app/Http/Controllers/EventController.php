<?php

  namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    // Display all events
    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    // Store new event
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:150',
            'type' => 'nullable|max:50',
            'age_group' => 'nullable|max:50'
        ]);

        $event = Event::create($request->all());

        return response()->json([
            'message' => 'Event created successfully',
            'data' => $event
        ]);
    }

    // Show single event
    public function show($id)
    {
        return Event::findOrFail($id);
    }

    // Update event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $event->update($request->all());

        return response()->json([
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }

    // Delete event
    public function destroy($id)
    {
        Event::destroy($id);

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }
}
