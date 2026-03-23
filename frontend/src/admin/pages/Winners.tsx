import { useEffect, useState } from "react";
import api from "../../api";

type Student = {
  id: number;
  name: string;
  email: string;
  school_name: string;
};

export default function Winners() {
  const [eventId, setEventId] = useState("");
  const [students, setStudents] = useState<any>({});
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch students by event
  const fetchStudents = async () => {
    if (!eventId) return;
    try {
      const res = await api.get(`/event/${eventId}/students`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to load students");
    }
  };

  // 🏆 Select winner
  const handleSelect = (studentId: number, prize: string) => {
    const updated = winners.filter(w => w.student_id !== studentId);
    updated.push({ student_id: studentId, prize });
    setWinners(updated);
  };

  // 🚀 Submit winners + send certificates
  const submitWinners = async () => {
    if (!eventId || winners.length === 0) {
      alert("⚠️ Enter event ID and select at least one winner");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Assign winners
      await api.post("/event/assign-winners", { event_id: eventId, winners });
      alert("✅ Winners Assigned!");

      // 2️⃣ Send certificates
      await api.get(`/event/${eventId}/certificate`);
      alert("📄 Certificates sent successfully!");
    } catch (error: any) {
      console.error(error);
      alert("❌ Error assigning winners or sending certificates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏆 Assign Winners</h2>

      {/* EVENT ID INPUT */}
      <input
        placeholder="Enter Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={fetchStudents}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Load Students
      </button>

      {/* STUDENTS LIST */}
      {Object.keys(students).map((school) => (
        <div key={school} className="mt-6">
          <h3 className="font-bold text-lg text-purple-600">{school}</h3>

          {students[school].map((s: Student) => (
            <div key={s.id} className="flex justify-between border p-2 mt-2">
              <span>{s.name}</span>
              <div className="space-x-2">
  {["First", "Second", "Third"].map((p) => {
    const selected = winners.find(
      (w) => w.student_id === s.id && w.prize === p
    );

    return (
      <button
        key={p}
        onClick={() => handleSelect(s.id, p)}
        className={`px-3 py-1 rounded text-white 
          ${
            p === "First"
              ? selected
                ? "bg-yellow-700"
                : "bg-yellow-500"
              : p === "Second"
              ? selected
                ? "bg-gray-600"
                : "bg-gray-400"
              : selected
              ? "bg-orange-700"
              : "bg-orange-500"
          }`}
      >
        {p === "First" && "🥇"}
        {p === "Second" && "🥈"}
        {p === "Third" && "🥉"} {p}
      </button>
    );
  })}
</div>
            </div>
          ))}
        </div>
      ))}

      {/* SUBMIT */}
      <button
        onClick={submitWinners}
        disabled={loading}
        className={`mt-6 px-6 py-2 text-white ${loading ? "bg-gray-400" : "bg-green-600"}`}
      >
        {loading ? "Processing..." : "Submit Winners"}
      </button>
    </div>
  );
}