import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import Swal from "sweetalert2";
// Import-la entha mathamum illai
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
      Swal.fire("Success!", "New Category added!", "success");
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
      Swal.fire("Success!", "Updated successfully", "success");
      resetForm();
      fetchCategories();
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Sure-aa delete panna poringa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire("Deleted!", "Category gone!", "success");
      fetchCategories();
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
          {/* ✅ FIXED: Used as a function */}
          {FaPlus({ size: 16 })} Add Category
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-pink-500 text-white text-center">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="text-center border-b hover:bg-gray-50">
                <td className="p-3">{cat.id}</td>
                <td className="p-3">
                    <img 
                        src={cat.image_url || "https://via.placeholder.com/50"} 
                        alt={cat.name} 
                        className="w-12 h-12 object-cover rounded mx-auto border"
                    />
                </td>
                <td className="p-3 font-medium">{cat.name}</td>
                <td className="p-3 text-gray-600">{cat.description}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setEditData(cat);
                      setName(cat.name);
                      setDescription(cat.description);
                    }}
                    className="text-blue-500 hover:scale-110 transition"
                  >
                    {/* ✅ FIXED: Used as a function */}
                    {FaPenToSquare({ size: 20 })}
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    {/* ✅ FIXED: Used as a function */}
                    {FaTrash({ size: 20 })}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddModal || editData) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-bold">
                {showAddModal ? "Add New Category" : "Edit Category"}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-black">
                {/* ✅ FIXED: Used as a function */}
                {FaXmark({ size: 24 })}
              </button>
            </div>

            <form onSubmit={showAddModal ? handleStore : handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
<input 
  type="text"
  required
  value={name}
  onChange={(e) => {
    const value = e.target.value;

    // ❌ check if number exists
    if (/[0-9]/.test(value)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Numbers are not allowed. Please enter letters only.",
      });
      return; // stop updating input
    }

    setName(value);
  }}
  className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-pink-500"
/>              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded p-2 outline-none focus:ring-2 focus:ring-pink-500" rows={3}/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Image</label>
                <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-pink-600 text-white font-bold rounded hover:bg-pink-700 transition shadow-md">
                  {showAddModal ? "Create Now" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Categories;