import { useEffect, useState } from "react";
import api from "../../api";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

export default function AdminGallery() {
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  // 🔥 fetch categories
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = async () => {
    if (!image || !category) {
      return alert("Select image & category");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    await api.post("/gallery", formData);

    alert("Uploaded successfully!");

    // reset
    setImage(null);
    setCategory("");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">

      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload Gallery Image
      </h2>

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-4 w-full"
      />

      {/* 🔥 CATEGORY DROPDOWN */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
      >
        Upload
      </button>

    </div>
  );
}