import { useEffect, useState } from "react";
import api from "../../api";

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
  const [searchTerm, setSearchTerm] = useState("");
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
    }).catch(err => {
      console.error(err);
      alert("Something went wrong!");
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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Events Management</h1>
          <p className="text-slate-500 text-sm">Create, edit and manage your competition events.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl w-full focus:ring-2 focus:ring-amber-500 outline-none shadow-sm transition-all bg-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-slate-950 text-amber-500 border border-amber-500/30 px-5 py-2.5 rounded-xl hover:bg-slate-900 transition flex items-center gap-2 whitespace-nowrap shadow-lg font-bold uppercase text-xs tracking-widest"
          >
            <span className="text-lg">+</span> Add Event
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-950 text-amber-500 uppercase text-[11px] font-bold tracking-widest">
            <tr>
              <th className="p-5">ID</th>
              <th className="p-5">Image</th>
              <th className="p-5">Event Name</th>
              <th className="p-5">Type</th>
              <th className="p-5">Age Group</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentEvents.length > 0 ? (
              currentEvents.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-5 text-slate-500 font-mono text-xs">{e.id}</td>
                  <td className="p-5">
                    {e.image ? (
                      <img 
                        src={`http://127.0.0.1:8000/upload/events/${e.image}`} 
                        className="w-12 h-12 object-cover rounded-lg shadow-md border border-slate-200 group-hover:scale-110 transition-transform" 
                        alt={e.name} 
                      />
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400 border border-dashed border-slate-300">No Image</div>
                    )}
                  </td>
                  <td className="p-5 font-bold text-slate-800">{e.name}</td>
                  <td className="p-5 text-slate-600">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium uppercase">{e.type}</span>
                  </td>
                  <td className="p-5 text-slate-600 font-medium italic">{e.age_group}</td>
                  <td className="p-5 space-x-2 text-center">

  {/* ✏️ EDIT */}
  <button 
    onClick={() => handleEdit(e)} 
    className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase"
  >
    Edit
  </button>

  {/* ❌ DELETE */}
  <button 
    onClick={() => confirmDelete(e.id!)} 
    className="text-red-500 hover:text-red-700 font-bold text-xs uppercase"
  >
    Delete
  </button>

  {/* 📄 FULL REPORT */}
  <button
    onClick={() =>
      window.open(
        `http://localhost:8000/api/event/${e.id}/schools-students/download`,
        "_blank"
      )
    }
    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold"
  >
    Full Report
  </button>

  {/* 🏫 SCHOOL LIST */}
  <button
    onClick={() =>
      window.open(
        `http://localhost:8000/api/event/${e.id}/schools/download`,
        "_blank"
      )
    }
    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
  >
    Schools
  </button>

</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-20 text-center">
                  <div className="flex flex-col items-center opacity-40">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    <p className="font-medium">No events found matching your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full font-bold transition-all shadow-sm ${currentPage === i + 1 ? "bg-slate-950 text-amber-500 border border-amber-500/50 scale-110" : "bg-white text-slate-400 hover:bg-slate-100 border border-slate-200"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* --- ADD/EDIT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 z-[999]">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative border border-slate-100 overflow-hidden">
             {/* Modal Header Glow */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
            
            <h2 className="text-2xl font-black mb-6 text-slate-900 flex justify-between items-center">
              {isEdit ? "Update Event" : "Create Event"}
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full uppercase tracking-tighter">Admin Only</span>
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Index</label>
                <input name="category_id" onChange={handleChange} value={form.category_id} className="w-full border-2 border-slate-100 p-3 rounded-xl mt-1 focus:border-amber-500 focus:ring-0 outline-none transition-all bg-slate-50 font-bold"/>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Name</label>
                <input name="name" onChange={handleChange} value={form.name} className="w-full border-2 border-slate-100 p-3 rounded-xl mt-1 focus:border-amber-500 focus:ring-0 outline-none transition-all"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                  <input name="type" onChange={handleChange} value={form.type} placeholder="e.g. Solo" className="w-full border-2 border-slate-100 p-3 rounded-xl mt-1 focus:border-amber-500 focus:ring-0 outline-none transition-all"/>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age Group</label>
                  <input name="age_group" onChange={handleChange} value={form.age_group} placeholder="e.g. 10-15" className="w-full border-2 border-slate-100 p-3 rounded-xl mt-1 focus:border-amber-500 focus:ring-0 outline-none transition-all"/>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image</label>
                <div className="mt-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition-colors relative">
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="absolute inset-0 opacity-0 cursor-pointer"/>
                    <p className="text-xs text-slate-500 font-medium">{file ? file.name : "Click to upload image"}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-10 gap-4">
              <button onClick={closeModal} className="px-5 py-2.5 text-slate-400 font-bold text-xs uppercase hover:text-slate-600 transition">Discard</button>
              <button onClick={handleSubmit} className="bg-slate-950 text-amber-500 border border-amber-500/30 px-8 py-2.5 rounded-xl hover:bg-slate-900 shadow-xl shadow-amber-500/10 transition font-black uppercase text-xs tracking-widest">
                {isEdit ? "Confirm Update" : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-[999]">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border-t-4 border-red-500">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Danger Zone</h2>
            <p className="text-slate-500 mt-3 font-medium">This action will permanently delete the event record.</p>
            <div className="flex flex-col gap-3 mt-8">
              <button onClick={handleDelete} className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-black uppercase text-xs tracking-widest shadow-lg shadow-red-500/20">Delete Permanently</button>
              <button onClick={() => setShowDeleteModal(false)} className="w-full py-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition font-bold uppercase text-xs">Keep Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}