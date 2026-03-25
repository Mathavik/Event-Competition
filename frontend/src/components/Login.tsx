import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react"; // Icons add panniruken

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/login", { email, password });
      const { token, student } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("student_name", student.name);
      localStorage.setItem("student_id", student.id);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Hello ${student.name}, taking you to categories...`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setTimeout(() => {
        navigate("/categories");
      }, 2000);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.error || "Invalid credentials. Please try again.",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Main Card */}
      <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please enter your details to login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Login to Account</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;