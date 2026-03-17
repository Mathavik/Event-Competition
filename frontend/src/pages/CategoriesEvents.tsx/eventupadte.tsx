import { useEffect, useState } from "react";
import api from "../../api";

type Event = {
  id?: number;
  category_id: number;
  name: string;
  type: string;
  age_group: string;
};

export default function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Event>({
    category_id: 1,
    name: "",
    type: "",
    age_group: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  // 🔥 Load events
  const fetchEvents = () => {
    api.get("/events").then((res) => setEvents(res.data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔥 Handle input
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 CREATE / UPDATE
  const handleSubmit = () => {
    if (isEdit) {
      api.put(`/events/${form.id}`, form).then(() => {
        fetchEvents();
        resetForm();
      });
    } else {
      api.post("/events", form).then(() => {
        fetchEvents();
        resetForm();
      });
    }
  };

  // 🔥 Edit click
  const handleEdit = (event: Event) => {
    setForm(event);
    setIsEdit(true);
  };

  // 🔥 Delete
  const handleDelete = (id: number) => {
    api.delete(`/events/${id}`).then(() => fetchEvents());
  };

  const resetForm = () => {
    setForm({
      category_id: 1,
      name: "",
      type: "",
      age_group: "",
    });
    setIsEdit(false);
  };

  return (
    <div className="p-6">

      {/* 🔥 FORM */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">
          {isEdit ? "Update Event" : "Create Event"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <input name="category_id" placeholder="Category ID" onChange={handleChange} value={form.category_id} className="border p-2" />
          <input name="name" placeholder="Name" onChange={handleChange} value={form.name} className="border p-2" />
          <input name="type" placeholder="Type" onChange={handleChange} value={form.type} className="border p-2" />
          <input name="age_group" placeholder="Age Group" onChange={handleChange} value={form.age_group} className="border p-2" />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>

      {/* 📊 TABLE */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="text-center border-t">
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.type}</td>
              <td>{e.age_group}</td>

              <td className="space-x-2">
                <button
                  onClick={() => handleEdit(e)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(e.id!)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}