import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

interface Event {
  id: number;
  name: string;
  type: string;
  age_group: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events")
      .then(res => setEvents(res.data));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Events</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-pink-500 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Age Group</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} className="text-center border-b">
              <td className="p-3">{event.id}</td>
              <td className="p-3">{event.name}</td>
              <td className="p-3">{event.type}</td>
              <td className="p-3">{event.age_group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Events;