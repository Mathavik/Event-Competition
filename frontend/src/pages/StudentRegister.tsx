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
  const [schoolSuggestions, setSchoolSuggestions] = useState<any[]>([]);
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

  const [acceptedRules, setAcceptedRules] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "school_name" && value.length > 0) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/schools?q=${value}`
        );
        setSchoolSuggestions(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedRules) {
      Swal.fire({
        icon: "warning",
        title: "Accept Rules",
        text: "Please accept Rules & Regulations to continue",
      });
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/students", form, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

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
        <h2 className="text-2xl font-bold mb-6 text-center">
          Student Registration
        </h2>

        {message && (
          <p className="mb-4 text-center text-red-500">{message}</p>
        )}
      
        <div className="relative w-full mb-3">
          <input
            type="text"
            name="school_name"
            placeholder="School Name"
            value={form.school_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {schoolSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 border rounded bg-white max-h-40 overflow-y-auto z-10 shadow-lg">
              {schoolSuggestions.map((school, idx) => (
                <div
                  key={idx}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      school_name: school.school_name,
                      school_code: school.school_code,
                      email: school.email,
                      phone: school.phone,
                      city: school.city,
                    }));
                    setSchoolSuggestions([]);
                  }}
                >
                  {school.school_name} ({school.city}) - {school.phone}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          name="school_code"
          placeholder="School Code"
          value={form.school_code}
          readOnly
          className="mb-3 w-full p-2 border rounded bg-gray-100"
        />


        <input
          type="email"
          name="email"
          placeholder="School Email"
          value={form.email}
          onChange={handleChange}
          className="mb-3 w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
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
          type="tel"
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

        <label className="mb-2 block text-gray-700">Date of Birth :</label>
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
        <h3 className="font-bold mb-2">Rules & Regulations</h3>

        {/* 🔥 Rules Section */}
        <div className="mb-4 border p-3 rounded bg-gray-50 max-h-40 overflow-y-auto text-sm">
          <ul className="list-disc pl-4 space-y-1">
            <li>Maximum 5 events per student allowed</li>
            <li>No time clash between events</li>
            <li>Age eligibility must be followed</li>
            <li>Only one participant per school per event</li>
            <li>Team events require valid members</li>
            <li>Once registered, cannot be cancelled</li>
            <li>Event timings are subject to change on the day of the event</li>
          </ul>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={acceptedRules}
            onChange={(e) => setAcceptedRules(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">
            I agree to the Rules & Regulations
          </label>
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white transition ${acceptedRules
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={!acceptedRules}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;