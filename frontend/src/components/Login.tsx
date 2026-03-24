import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/login", { email, password });
      const { token, student } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("student_name", student.name);
      localStorage.setItem("student_id", student.id);

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: `Welcome ${student.name}`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/categories");
      }, 1500);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.error || "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Student Login
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail className="text-gray-400 mr-2" size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 mb-6 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock className="text-gray-400 mr-2" size={18} />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition duration-300"
          >
            Login
          </button>

        </form>

        {/* Extra */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;