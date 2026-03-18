<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Category;
use App\Models\Student;

class EventController extends Controller
{
    // 📌 Get all events
    public function index()
    {
        $events = Event::with('category')->get();
        return response()->json($events);
    }

    // 📌 Create event (ADMIN)
    public function store(Request $request)
{
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('events', 'public');
    } else {
        $imagePath = null;
    }

    $event = Event::create([
        'category_id' => $request->category_id,
        'name' => $request->name,
        'type' => $request->type,
        'age_group' => $request->age_group,
        'image' => $imagePath
    ]);

    return response()->json($event);
}

    // 📌 Show event
    public function show($id)
    {
        $event = Event::with('category')->findOrFail($id);
        return response()->json($event);
    }

    // 📌 Update event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        // 🖼️ Image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
            $event->image = $imagePath;
        }

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


    public function bulkStore(Request $request)
{
    $events = $request->all();

    $data = [];

foreach ($events as $event) {
    $data[] = [
        'category_id' => $event['category_id'],
        'name'        => $event['name'],
        'type'        => $event['type'],
        'age_group'   => $event['age_group'],
        'image'       => $event['image'] ?? null, // Filename JSON-la irunthu edukkum
        'created_at'  => now(),
        'updated_at'  => now(),
    ];
}

    Event::insert($data); // 🔥 fast bulk insert

    return response()->json([
        'message' => 'Bulk events inserted successfully'
    ]);
}


public function bulkUpdate(Request $request)
{
    $events = $request->all();

    foreach ($events as $item) {
        $event = Event::find($item['id']);

        if ($event) {
            $event->update([
                'category_id' => $item['category_id'] ?? $event->category_id,
                'name' => $item['name'] ?? $event->name,
                'type' => $item['type'] ?? $event->type,
                'age_group' => $item['age_group'] ?? $event->age_group,
            ]);
        }
    }

    return response()->json([
        'message' => 'Bulk update successful'
    ]);
}
}