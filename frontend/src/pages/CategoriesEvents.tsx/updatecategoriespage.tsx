import { useState } from "react";
import api from "../../api";

export default function CategoryForm() {
  const [id, setId] = useState(""); // update ku
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // 🔥 CREATE
  const handleCreate = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await api.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      alert("Category Created 🔥");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    if (!id) {
      alert("ID kudu da 😅");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await api.post(`/categories/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category Updated 😎🔥");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">

      <h2 className="text-2xl font-bold text-center">
        Category Form
      </h2>

      {/* ID (update ku mattum) */}
      <input
        type="number"
        placeholder="ID (update ku mattum)"
        onChange={(e) => setId(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="file"
        onChange={(e: any) => setImage(e.target.files[0])}
        className="border p-2 w-full"
      />

      {/* 🔥 CREATE BUTTON */}
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Create Category
      </button>

      {/* 🔥 UPDATE BUTTON */}
      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 w-full rounded"
      >
        Update Category
      </button>

    </div>
  );
}