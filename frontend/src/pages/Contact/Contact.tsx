import { useState } from "react";
import api from "../../api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/contact", form);
      alert("✅ Message Sent!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert("❌ Error sending message");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-pink-500 text-white text-center p-10 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2">We’re here to help you!</p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="border p-2 w-full mb-3 rounded"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className="border p-2 w-full mb-3 rounded"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-pink-500 hover:bg-pink-600 text-white w-full py-2 rounded"
        >
          Send Message 🚀
        </button>

      </div>

    </div>
  );
}