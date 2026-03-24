import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPenToSquare, FaTrash, FaPlus, FaXmark } from "react-icons/fa6";

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  image_url?: string; 
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const API_URL = "http://127.0.0.1:8000/api/categories";

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = () => {
    axios.get(API_URL).then((res) => setCategories(res.data));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageFile(null);
    setEditData(null);
    setShowAddModal(false);
  };

  const handleStore = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post(API_URL, formData);
      Swal.fire({
        title: "Success!",
        text: "New Category added!",
        icon: "success",
        confirmButtonColor: '#f59e0b' // Amber color
      });
      resetForm();
      fetchCategories();
    } catch (err) {
      Swal.fire("Error!", "Check your inputs", "error");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    const formData = new FormData();
    formData.append("_method", "PUT"); 
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post(`${API_URL}/${editData.id}`, formData);
      Swal.fire({
        title: "Success!",
        text: "Updated successfully",
        icon: "success",
        confirmButtonColor: '#f59e0b'
      });
      resetForm();
      fetchCategories();
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Ithai thirumba edukka mudiyathu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Red for delete
      cancelButtonColor: '#64748b', // Slate for cancel
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire("Deleted!", "Category deleted.", "success");
        fetchCategories();
      } catch (err) {
        Swal.fire("Error!", "Delete failed", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Categories</h2>
          <p className="text-slate-500 text-sm">Organize and manage your event categories.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-slate-950 text-amber-500 border border-amber-500/30 px-5 py-2.5 rounded-xl hover:bg-slate-900 transition flex items-center gap-2 shadow-lg font-bold uppercase text-xs tracking-widest"
        >
          {React.createElement(FaPlus as any, { size: 14 })} Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-950 text-amber-500 uppercase text-[11px] font-bold tracking-widest">
            <tr>
              <th className="p-5 text-center w-20">ID</th>
              <th className="p-5 text-center w-28">Image</th>
              <th className="p-5">Category Name</th>
              <th className="p-5">Description</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-5 text-center text-slate-400 font-mono text-xs">#{cat.id}</td>
                <td className="p-5">
                  <img 
                    src={cat.image_url || "https://via.placeholder.com/50"} 
                    alt={cat.name} 
                    className="w-12 h-12 object-cover rounded-xl mx-auto border-2 border-slate-100 group-hover:scale-110 transition-transform shadow-sm"
                  />
                </td>
                <td className="p-5 font-bold text-slate-800 uppercase text-sm tracking-tight">{cat.name}</td>
                <td className="p-5 text-slate-500 text-xs leading-relaxed max-w-xs truncate">{cat.description}</td>
                <td className="p-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditData(cat);
                        setName(cat.name);
                        setDescription(cat.description);
                      }}
                      className="text-slate-600 hover:text-amber-600 transition p-2.5 bg-slate-100 hover:bg-amber-50 rounded-lg"
                    >
                      {React.createElement(FaPenToSquare as any, { size: 16 })}
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-slate-600 hover:text-red-600 transition p-2.5 bg-slate-100 hover:bg-red-50 rounded-lg"
                    >
                      {React.createElement(FaTrash as any, { size: 16 })}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (Add & Edit) */}
      {(showAddModal || editData) && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex justify-center items-center z-[999] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 relative">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>

            <div className="p-6 flex justify-between items-center border-b border-slate-50 mt-1">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {showAddModal ? "New Category" : "Edit Category"}
              </h3>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-900 transition">
                {React.createElement(FaXmark as any, { size: 24 })}
              </button>
            </div>

            <form onSubmit={showAddModal ? handleStore : handleUpdate} className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Category Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter name..."
                  value={name}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/[0-9]/.test(val)) {
                      Swal.fire("Error", "Numbers not allowed in Category Name", "error");
                      return;
                    }
                    setName(val);
                  }}
                  className="w-full border-2 border-slate-100 rounded-xl p-3.5 outline-none focus:border-amber-500 transition-all bg-slate-50 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                <textarea 
                  value={description} 
                  required
                  placeholder="Describe the category..."
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full border-2 border-slate-100 rounded-xl p-3.5 outline-none focus:border-amber-500 transition-all bg-slate-50 font-medium" 
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Cover Image</label>
                <div className="mt-1 flex items-center justify-center border-2 border-slate-200 border-dashed rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors relative">
                    <input 
                      type="file" 
                      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="text-center">
                      {React.createElement(FaPlus as any, { className: "mx-auto mb-2 text-slate-300", size: 20 })}
                      <p className="text-[11px] font-bold text-slate-500 uppercase">
                        {imageFile ? imageFile.name : "Drag or Click to Upload"}
                      </p>
                    </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={resetForm} className="px-5 py-2 text-slate-400 font-bold text-xs uppercase hover:text-slate-600 transition">Discard</button>
                <button type="submit" className="bg-slate-950 text-amber-500 border border-amber-500/30 px-8 py-3 rounded-xl shadow-xl shadow-amber-500/10 hover:bg-slate-900 transition font-black uppercase text-xs tracking-widest">
                  {showAddModal ? "Create Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;