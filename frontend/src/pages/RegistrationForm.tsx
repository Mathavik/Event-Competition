import React, { useEffect, useState } from "react";
import api from "../api";
import { AxiosResponse } from "axios";

// 1. Types define panrathu (Interfaces)
interface Category {
  id: number;
  name: string;
}

interface Event {
  id: number;
  name: string;
  category_id: number;
}

const RegistrationForm: React.FC = () => {
  const [schoolName, setSchoolName] = useState<string>("");
  const [principalName, setPrincipalName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [selectedEvent, setSelectedEvent] = useState<number | "">("");
  const [message, setMessage] = useState<string>("");

  // 2. Fetch Categories
   useEffect(() => {
    api
      .get<Category[]>("/categories") // tells Axios we expect Category[]
      .then((res: AxiosResponse<Category[]>) => {
        setCategories(res.data); // res.data is now typed as Category[]
      })
      .catch((err: Error) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // 3. Fetch Events based on Category
useEffect(() => {
  if (selectedCategory) {
    api
      .get<Event[]>("/events", { params: { category_id: selectedCategory } })
      .then((res: AxiosResponse<Event[]>) => {
        setEvents(res.data);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  } else {
    setEvents([]);
  }
}, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName || !principalName || !email || !selectedCategory || !selectedEvent) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      await api.post("/register", {
        school_name: schoolName,
        principal_name: principalName,
        email,
        category_id: selectedCategory,
        event_id: selectedEvent,
      });
      
      setMessage("Registration successful!");
      // Reset logic
      setSchoolName("");
      setPrincipalName("");
      setEmail("");
      setSelectedCategory("");
      setSelectedEvent("");
    } catch (err: any) {
      console.error("Submission failed:", err);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-white">School Registration</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded-lg font-medium ${message.includes("success") ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="School Name"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="w-full p-3 border border-slate-800 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
        />
        <input
          type="text"
          placeholder="Principal Name"
          value={principalName}
          onChange={(e) => setPrincipalName(e.target.value)}
          className="w-full p-3 border border-slate-800 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-slate-800 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
        />
        
        <label className="block text-slate-400 text-sm">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className="w-full p-3 border border-slate-800 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label className="block text-slate-400 text-sm">Event</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(Number(e.target.value))}
          className="w-full p-3 border border-slate-800 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option value="">Select Event</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.name}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-amber-500 text-slate-950 py-3 rounded-lg font-bold hover:bg-amber-400 transition-all active:scale-95 mt-4"
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;