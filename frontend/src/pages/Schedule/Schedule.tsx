import { useEffect, useState } from "react";
import api from "../../api";
import { AxiosError } from "axios";

type Event = {
  id: number;
  name: string;
  type: string;
  age_group: string;
  time: string;
  event_date: string;
  status: string;
};

export default function Schedule() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchEvents = () => {
    api.get("/events")
      .then((res: any) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err: any) => console.log(err));
  };

  fetchEvents(); // first load

  const interval = setInterval(fetchEvents, 60000); // 🔄 every 1 min

  return () => clearInterval(interval);
}, []);

  // 🔥 FILTER LOGIC
  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((e) => e.status === filter);

  // 🎨 STATUS COLOR
  const getColor = (status: string) => {
    if (status === "completed") return "bg-green-500";
    if (status === "ongoing") return "bg-yellow-400";
    return "bg-red-500";
  };

  // ⏳ LOADING UI
  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading Schedule...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-6">
        📅 Event Schedule
      </h1>

      {/* FILTER */}
      <div className="flex justify-center mb-10">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded shadow"
        >
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-3xl mx-auto">

        {/* LINE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found</p>
        ) : (
          filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`mb-10 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >

              <div className="w-1/2 px-4">

                <div className="bg-white p-4 rounded-xl shadow-lg relative">

                  {/* STATUS DOT */}
                  <div
                    className={`w-4 h-4 rounded-full absolute -left-6 top-5 ${getColor(
                      event.status
                    )}`}
                  ></div>

                  {/* TIME */}
                  <p className="text-sm text-gray-500">
                    ⏰{" "}
                    {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* DATE */}
                  <p className="text-xs text-gray-400">
                    📅 {event.event_date}
                  </p>

                  {/* NAME */}
                  <h3 className="text-lg font-bold mt-1">
                    {event.name}
                  </h3>

                  {/* DETAILS */}
                  <p className="text-sm text-gray-500">
                    {event.type} | {event.age_group}
                  </p>

                  {/* STATUS BADGE */}
                  <span
                    className={`text-white text-xs px-2 py-1 rounded mt-2 inline-block ${getColor(
                      event.status
                    )}`}
                  >
                    {event.status.toUpperCase()}
                  </span>

                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}