<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // 📌 Get all categories
    public function index()
    {
        $categories = Category::with('events')->get();
        return response()->json($categories);
    }

    // 📌 Store new category
public function store(Request $request)
{
    $imagePath = null;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('categories', 'public');
    }

    $category = Category::create([
        'name' => $request->name,
        'description' => $request->description,
        'image' => $imagePath,
    ]);

    return response()->json([
        'message' => 'Category created successfully',
        'data' => $category
    ]);
}

    // 📌 Show single category
    public function show($id)
    {
        $category = Category::with('events')->findOrFail($id);
        return response()->json($category);
    }

    // 📌 Update category
public function update(Request $request, $id)
{
    $category = Category::findOrFail($id);

    if ($request->hasFile('image')) {
    $file = $request->file('image');
    $fileName = time() . '_' . $file->getClientOriginalName();
    $file->move(public_path('upload/catogories'), $fileName); // Direct-a public folder-kku move pannum
    $category->image = $fileName;
}

    $category->save();

    return response()->json([
        'message' => 'Category updated successfully',
        'data' => $category
    ]);
}


    

    // 📌 Delete category
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }

public function bulkStore(Request $request)
{
    $categories = [];

    foreach ($request->categories as $cat) {
        $categories[] = Category::create([
            'name' => $cat['name'],
            'description' => $cat['description'] ?? null,
            'image' => $cat['image'] ?? null,
        ]);
    }

    return response()->json([
        'message' => 'Bulk categories created successfully',
        'data' => $categories
    ]);
}
    
}