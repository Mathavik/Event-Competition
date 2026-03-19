import { useEffect, useState } from "react";
import api from "../../api";
import AdminLayout from "../components/AdminLayout";

type Event = {
  id?: number;
  category_id: number;
  name: string;
  type: string;
  age_group: string;
  image?: string;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [file, setFile] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [form, setForm] = useState<Event>({
    category_id: 1,
    name: "",
    type: "",
    age_group: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchEvents = () => {
    api.get("/events").then((res) => setEvents(res.data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- FILTER LOGIC ---
  // Event Name, Type, illa Age Group-la search pannalam
  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.age_group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("category_id", String(form.category_id));
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("age_group", form.age_group);
    if (file) formData.append("image", file);

    const request = isEdit 
      ? api.post(`/events/${form.id}?_method=PUT`, formData)
      : api.post("/events", formData);

    request.then(() => {
      alert(isEdit ? "Updated Successfully!" : "Created Successfully!");
      fetchEvents();
      closeModal();
    });
  };

  const handleEdit = (event: Event) => {
    setForm(event);
    setIsEdit(true);
    setShowModal(true);
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedId) {
      api.delete(`/events/${selectedId}`).then(() => {
        fetchEvents();
        setShowDeleteModal(false);
        setSelectedId(null);
      });
    }
  };

  const closeModal = () => {
    setForm({ category_id: 1, name: "", type: "", age_group: "" });
    setFile(null);
    setIsEdit(false);
    setShowModal(false);
  };

  // Pagination-ku ippa filteredEvents use panrom
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Events Management</h1>
          
          <div className="flex w-full md:w-auto gap-3">
            {/* --- SEARCH BAR --- */}
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Search pannum pothu 1st page-ku poiduvom
                }}
              />
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-lg font-bold">+</span> Add Event
            </button>
          </div>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Age</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length > 0 ? (
                currentEvents.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">{e.id}</td>
                    <td className="p-4">
                      {e.image && (
                        <img src={`http://127.0.0.1:8000/upload/events/${e.image}`} 
                        className="w-12 h-12 object-cover rounded shadow-sm" alt="" />
                      )}
                    </td>
                    <td className="p-4 font-semibold text-gray-800">{e.name}</td>
                    <td className="p-4 text-gray-600">{e.type}</td>
                    <td className="p-4 text-gray-600">{e.age_group}</td>
                    <td className="p-4 space-x-2">
                      <button onClick={() => handleEdit(e)} className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition">Edit</button>
                      <button onClick={() => confirmDelete(e.id!)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-500 font-medium">
                    No results found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded transition ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* --- CREATE / EDIT MODAL --- */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">{isEdit ? "Update Event" : "Add New Event"}</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category ID</label>
                  <input name="category_id" onChange={handleChange} value={form.category_id} className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Event Name</label>
                  <input name="name" onChange={handleChange} value={form.name} className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <input name="type" onChange={handleChange} value={form.type} className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"/>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Age Group</label>
                    <input name="age_group" onChange={handleChange} value={form.age_group} className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"/>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Event Image</label>
                  <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="w-full border p-2 rounded mt-1 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-3">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition">Cancel</button>
                <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow-md transition">
                  {isEdit ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- DELETE CONFIRMATION MODAL --- */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative shadow-2xl">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold">Are you sure?</h2>
              <p className="text-gray-500 mt-2">This action cannot be undone.</p>
              <div className="flex justify-center mt-6 gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">No, Keep it</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Yes, Delete it</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}