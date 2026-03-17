import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        {
          email,
          password,
        }
      );

      // ✅ store admin data
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      // ✅ redirect to dashboard
      window.location.href = "/admin/";
    } catch (err: any) {
      setError("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Admin Login
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;