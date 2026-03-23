<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Category;
use App\Models\Student;
use Carbon\Carbon;

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
            'name'        => $request->name,
            'type'        => $request->type,
            'age_group'   => $request->age_group,
            'image'       => $imagePath,
            'entry_fee'   => $request->entry_fee,
            'event_date'  => $request->event_date,
            'start_time'  => $request->start_time,
            'end_time'    => $request->end_time,
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
        $event->name        = $request->name ?? $event->name;
        $event->type        = $request->type ?? $event->type;
        $event->age_group   = $request->age_group ?? $event->age_group;
        $event->entry_fee   = $request->entry_fee ?? $event->entry_fee;

        // 🔥 NEW FIELDS
        $event->event_date  = $request->event_date ?? $event->event_date;
        $event->start_time  = $request->start_time ?? $event->start_time;
        $event->end_time    = $request->end_time ?? $event->end_time;

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

    // 🔥 STUDENT EVENT REGISTRATION (UPDATED WITH TIME CLASH)
    public function registerEvent(Request $request)
    {
        $student = Student::findOrFail($request->student_id);
        $event   = Event::findOrFail($request->event_id);

        // ❌ Max 5 events
        if ($student->events()->count() >= 5) {
            return response()->json([
                'error' => 'Max 5 events only allowed'
            ], 400);
        }

        // 🔥 TIME CLASH LOGIC (UPDATED)
        $existingEvents = $student->events;

        foreach ($existingEvents as $e) {
            $start1 = Carbon::parse($e->event_date . ' ' . $e->start_time);
            $end1   = Carbon::parse($e->event_date . ' ' . $e->end_time);

            $start2 = Carbon::parse($event->event_date . ' ' . $event->start_time);
            $end2   = Carbon::parse($event->event_date . ' ' . $event->end_time);

            if ($start1->lt($end2) && $start2->lt($end1)) {
                return response()->json([
                    'error' => 'Time clash! Choose another event'
                ], 400);
            }
        }

        // ❌ Age validation
        $groups = explode(',', $event->age_group);
        $groups = array_map('trim', $groups);

        if (!in_array('All Ages', $groups)) {
            $valid = false;

            foreach ($groups as $g) {
                if ($g == 'U16' && $student->age <= 16) $valid = true;
                if ($g == 'U18' && $student->age <= 18) $valid = true;
                if ($g == 'U19' && $student->age <= 19) $valid = true;
            }

            if (!$valid) {
                return response()->json([
                    'error' => 'Not eligible for this event'
                ], 400);
            }
        }

        // ✅ Register event
        $student->events()->attach($event->id, [
            'event_time' => now() // optional (you can remove later)
        ]);

        return response()->json([
            'message' => 'Event registered successfully'
        ]);
    }

    // 📦 Bulk insert
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
                'image'       => $event['image'] ?? null,
                'entry_fee'   => $event['entry_fee'] ?? 0,
                'event_date'  => $event['event_date'] ?? null,
                'start_time'  => $event['start_time'] ?? null,
                'end_time'    => $event['end_time'] ?? null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ];
        }

        Event::insert($data);

        return response()->json([
            'message' => 'Bulk events inserted successfully'
        ]);
    }

    // 📦 Bulk update
    public function bulkUpdate(Request $request)
    {
        $events = $request->all();

        foreach ($events as $item) {
            $event = Event::find($item['id']);

            if ($event) {
                $event->update([
                    'category_id' => $item['category_id'] ?? $event->category_id,
                    'name'        => $item['name'] ?? $event->name,
                    'type'        => $item['type'] ?? $event->type,
                    'age_group'   => $item['age_group'] ?? $event->age_group,
                    'entry_fee'   => $item['entry_fee'] ?? $event->entry_fee,
                    'event_date'  => $item['event_date'] ?? $event->event_date,
                    'start_time'  => $item['start_time'] ?? $event->start_time,
                    'end_time'    => $item['end_time'] ?? $event->end_time,
                ]);
            }
        }

        return response()->json([
            'message' => 'Bulk update successful'
        ]);
    }
}