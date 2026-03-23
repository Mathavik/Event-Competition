import { useState } from "react";
import api from "../../api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">

      {/* 🔵 Background Blur Circles */}
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

      {/* MOBILE CARD */}
      <div className="relative w-full max-w-sm backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl overflow-hidden border border-white/40">

        {/* HEADER */}
        <div className="bg-pink-500 text-white text-center p-6">
          <h1 className="text-2xl font-bold">Contact Us</h1>
          <p className="text-sm mt-1">We’re here to help you 💬</p>
        </div>

        {/* FORM */}
        <div className="p-5 space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="👤 Your Name"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="📧 Your Email"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70"
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="📌 Subject"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="✍️ Your Message"
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70"
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

        </div>

      </div>

    </div>
  );
}