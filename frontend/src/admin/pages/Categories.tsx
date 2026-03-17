import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories")
      .then(res => setCategories(res.data));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Categories</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-pink-500 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id} className="text-center border-b">
              <td className="p-3">{cat.id}</td>
              <td className="p-3">{cat.name}</td>
              <td className="p-3">{cat.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Categories;