import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axiosInstance.post("/admin/login", { email, password });

      const { admin } = res.data;

      localStorage.setItem("admin_email", admin.email);

      setMessage("Login successful 🎉");

      setTimeout(() => {
        navigate("/admin/admindashboard");
      }, 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">

      {/* Glass Card */}
      <div className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/20">

        {/* Glow Effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>

        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">
          Admin Login
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-yellow-200 animate-pulse">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-white/70" size={20} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-white/70" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Login 🚀
          </button>
        </form>

        <p className="text-center text-xs text-white/70 mt-6">
          © 2026 Admin Panel
        </p>
      </div>

      {/* Animation style */}
      <style>
        {`
          .animate-gradient-x {
            background-size: 400% 400%;
            animation: gradientMove 8s ease infinite;
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

    </div>
  );
};

export default AdminLogin;