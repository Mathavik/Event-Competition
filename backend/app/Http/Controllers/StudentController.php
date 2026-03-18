<?php
namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StudentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students',
            'password' => 'required|min:6',
            'dob' => 'required|date',
            'school_code' => 'required'
        ]);

        // School restriction
        $allowedSchools = ['SCH001','SCH002'];

       if (!in_array($request->school_code, $allowedSchools)) {
    return response()->json(['error' => 'School not allowed'], 403);
}

        $age = Carbon::parse($request->dob)->age;

        Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'age' => $age,
            'school_name' => $request->school_name,
            'school_code' => $request->school_code,
            'class' => $request->class,
            'city' => $request->city,
        ]);

return response()->json([
    'message' => 'Registered Successfully',
    'status' => 'success'
], 201);    }
}