import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import targetGif from "../../assets/c.gif";

// 🎥 Videos
import sportsVideo from "../../assets/sports.mp4";
import artsVideo from "../../assets/Visual.mp4";
import funVideo from "../../assets/Visual.mp4";

type Event = {
  id: number;
  name: string;
  type: string;
  age_group: string;
  image: string;
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
  const [category, setCategory] = useState<Category | null>(null);

  // 🔥 booking loading state
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    api
      .get(`/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // 🎯 Video Mapping
  const videoMap: { [key: string]: string } = {
    sports: sportsVideo,
    visual: artsVideo,
    arts: artsVideo,
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

  // 🔥 BOOK EVENT FUNCTION
  const handleBookEvent = async (eventId: number) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      alert("Please login first!");
      return;
    }

    try {
      setLoadingId(eventId);

      await api.post("/event/register", {
        student_id: studentId,
        event_id: eventId,
        event_time: "2026-04-10 10:00:00", // 🔥 static (later dynamic panna sollu)
      });

      alert("✅ Event Registered Successfully!");
    } catch (error: any) {
      console.log(error);

      const msg =
        error?.response?.data?.message ||
        "❌ Registration failed";

      alert(msg);
    } finally {
      setLoadingId(null);
    }
  };

  if (!category)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Loading events...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🎥 VIDEO */}
      <div className="relative h-64 md:h-[350px] w-full overflow-hidden shadow-lg">
        <video
          key={category.name}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src={getVideoByCategory(category.name)}
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-black uppercase">
            {category.name}
          </h1>
        </div>
      </div>

      {/* 📦 EVENTS */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <img src={targetGif} className="w-10 h-10" />
            Events in this Category
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {category.events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                {event.image && (

<img
  src={`http://127.0.0.1:8000/upload/events/${event.image}`}
  className="w-full h-full object-cover" 
/>
 
)}
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-500">
                  {event.age_group}
                </p>
              </div>

              {/* 🔥 ACTIONS */}
              <div className="p-4 flex justify-between items-center">
                <Link
                  to={`/event-details/${event.id}`}
                  className="text-blue-600 text-sm font-bold"
                >
                  VIEW
                </Link>

                {/* 🔥 BOOK BUTTON */}
                <button
                  onClick={() => handleBookEvent(event.id)}
                  disabled={loadingId === event.id}
                  className="bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:bg-green-600"
                >
                  {loadingId === event.id
                    ? "Booking..."
                    : "Book Event"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}