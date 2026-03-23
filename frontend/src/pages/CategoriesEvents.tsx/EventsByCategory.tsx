import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

// 🎥 Videos
import sportsVideo from "../../assets/sports.mp4";
import performingVideo from "../../assets/Classical.mp4";
import artsVideo from "../../assets/Visual.mp4";
import funVideo from "../../assets/Visual.mp4";

type Event = {
  id: number;
  name: string;
  type: string;
  age_group: string;
  image: string;
  time: string;
  entry_fee?: number;
};

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
  events: Event[];
};

export default function EventsByCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([""]);

  useEffect(() => {
    api
      .get(`/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const videoMap: { [key: string]: string } = {
    sports: sportsVideo,
    visual: artsVideo,
    arts: performingVideo,
    fun: funVideo,
    misc: funVideo,
  };

  const getVideoByCategory = (name: string) => {
    const key = name.toLowerCase();
    const matchedKey = Object.keys(videoMap).find((k) =>
      key.includes(k)
    );
    return matchedKey ? videoMap[matchedKey] : sportsVideo;
  };

  const handleSoloBooking = async (event: Event) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first!");
      return;
    }

    try {
      setLoadingId(event.id);

      const res = await api.post("/register-event", {
        student_id: studentId,
        event_id: event.id,
        event_time: "2026-04-10 10:00:00",
      });

      navigate("/payment", {
        state: {
          isTeam: false,
          event_student_id: res.data.event_student_id,
          event_name: res.data.event_name || event.name,
          amount: event.entry_fee || 0,
        },
      });
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error");
    } finally {
      setLoadingId(null);
    }
  };

  const handleTeamSubmit = async () => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first!");
      return;
    }

    if (!teamName.trim() || members.length === 0) {
      alert("Enter team details");
      return;
    }

    const filteredMembers = members.filter((m) => m.trim() !== "");

    try {
      const res = await api.post("/register-event", {
        event_id: selectedEvent?.id,
        members: [studentId, ...filteredMembers],
        event_time: "2026-04-10 10:00:00",
      });

      setShowPopup(false);
      setTeamName("");
      setMembers([""]);

      navigate("/payment", {
        state: {
          isTeam: true,
          registrations: res.data.registrations,
          event_name: selectedEvent?.name,
          amount: selectedEvent?.entry_fee || 0,
        },
      });
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error");
    }
  };

  if (!category) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-[350px]">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={getVideoByCategory(category.name)} />
        </video>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">
            {category.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {category.events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow">
              <img
                src={`http://127.0.0.1:8000/upload/events/${event.image}`}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="font-bold">{event.name}</h3>

                <p className="text-sm text-gray-500">{event.age_group}</p>

                <p className="text-blue-500 text-sm">
                  ⏰{" "}
                  {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="text-xs text-purple-500 mt-1">{event.type}</p>

                <p className="text-sm text-green-600 mt-1">
                  Entry Fee: ₹{event.entry_fee || 0}
                </p>
              </div>

              <div className="p-3 flex justify-end">
                <button
                  onClick={() => {
                    if (event.type === "Team") {
                      setSelectedEvent(event);
                      setShowPopup(true);
                    } else {
                      handleSoloBooking(event);
                    }
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  disabled={loadingId === event.id}
                >
                  {loadingId === event.id
                    ? "Processing..."
                    : event.type === "Team"
                    ? "Book Team"
                    : "Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-xl w-96 relative">
            {/* Close Button Added Here */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-3 text-center">Create Team</h2>

            <input
              placeholder="Team Name"
              className="border p-2 w-full mb-3"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            {members.map((m, i) => (
              <input
                key={i}
                placeholder={`Member ${i + 1} Student ID`}
                className="border p-2 w-full mb-2"
                value={m}
                onChange={(e) => {
                  const newMembers = [...members];
                  newMembers[i] = e.target.value;
                  setMembers(newMembers);
                }}
              />
            ))}

            <button
              onClick={() => setMembers([...members, ""])}
              className="text-blue-500 text-sm mb-3"
            >
              + Add Member
            </button>

            <button
              onClick={handleTeamSubmit}
              className="bg-green-500 text-white w-full py-2 rounded font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}