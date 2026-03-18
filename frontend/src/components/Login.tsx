import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
        const res = await axiosInstance.post("/login", { email, password });
        const { token, student } = res.data;

        // Save token
        localStorage.setItem("token", token);
        localStorage.setItem("student_name", student.name);
        localStorage.setItem("student_id", student.id);

        setMessage("Login successful 🎉");

        // ✅ Redirect to categories page
        setTimeout(() => {
            navigate("/categories");
        }, 1000);

    } catch (err: any) {
        setMessage(err.response?.data?.error || "Something went wrong!");
    }
};

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

                {message && <p className="mb-4 text-center text-red-500">{message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3 w-full p-2 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-5 w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;