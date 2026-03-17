<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Category;

class EventController extends Controller
{
    // 📌 Get all events with category
    public function index()
    {
        $events = Event::with('category')->get();
        return response()->json($events);
    }

    // 📌 Create new event
    public function store(Request $request)
    {
        $event = Event::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'type' => $request->type,
            'age_group' => $request->age_group,
        ]);

        return response()->json([
            'message' => 'Event created successfully',
            'data' => $event
        ]);
    }

    // 📌 Show single event
    public function show($id)
    {
        $event = Event::with('category')->findOrFail($id);
        return response()->json($event);
    }

    // 📌 Update event
  public function update(Request $request, $id)
{
    $event = Event::findOrFail($id);

    // 🖼️ image upload
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('events', 'public');
        $event->image = $imagePath;
    }

    // 🔄 other fields
    $event->category_id = $request->category_id ?? $event->category_id;
    $event->name = $request->name ?? $event->name;
    $event->type = $request->type ?? $event->type;
    $event->age_group = $request->age_group ?? $event->age_group;

    $event->save();

    return response()->json([
        'message' => 'Event updated successfully',
        'data' => $event
    ]);
}

    // 📌 Delete event
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }
}