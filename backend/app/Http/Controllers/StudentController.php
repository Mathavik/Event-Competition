<?php
namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
public function getRegistrations()
{
    
    $registrations = DB::table('event_student') 
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->select(
            'event_student.id',
            'students.name',
            'students.email',
            'event_student.event_id'
        )
        ->get();

    return response()->json($registrations);
}
public function getSchools(Request $request)
{
    $query = $request->input('q');

    $schools = Student::where('school_name', 'LIKE', "%$query%")
        ->select('school_name', 'school_code', 'city', 'phone', 'email')
        ->distinct()
        ->limit(10)
        ->get();

    return response()->json($schools);
}
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students',
            'password' => 'required|min:6',
            'dob' => 'required|date',
            'school_code' => 'required'
        ]);

//        if (!in_array($request->school_code, $allowedSchools)) {
//     return response()->json(['error' => 'School not allowed'], 403);
// }


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