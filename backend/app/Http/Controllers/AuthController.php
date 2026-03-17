<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Student Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $student = Student::where('email', $request->email)->first();

        if (!$student || !Hash::check($request->password, $student->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Generate API Token
        $token = Str::random(60);
        $student->api_token = $token;
        $student->save();

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'student' => $student
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $student = Student::where('api_token', $request->bearerToken())->first();
        if ($student) {
            $student->api_token = null;
            $student->save();
        }
        return response()->json(['message' => 'Logged out successfully']);
    }
}