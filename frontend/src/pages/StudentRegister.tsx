import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: string;
  school_name: string;
  school_code: string;
  class: string;
  city: string;
}

const StudentRegister: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    dob: "",
    school_name: "",
    school_code: "",
    class: "",
    city: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/students",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // ✅ SUCCESS POPUP
      Swal.fire({
        icon: "success",
        title: "Registered Successfully 🎉",
        text: "Redirecting to login...",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: any) {
      // ❌ ERROR POPUP
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.error || "Something went wrong!",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Student Registration</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label className="mb-3 block text-gray-700">Date of Birth :</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="school_name"
          placeholder="School Name"
          value={form.school_name}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
        />

        <input
          type="text"
          name="school_code"
          placeholder="School Code"
          value={form.school_code}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={form.class}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="mb-5 w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;