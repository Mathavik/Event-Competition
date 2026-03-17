import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

interface Registration {
  id: number;
  name: string;
  email: string;
  event_id: number;
}

const Registrations: React.FC = () => {
  const [data, setData] = useState<Registration[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/registrations")
      .then(res => setData(res.data));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Registrations</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-pink-500 text-white">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Event ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="text-center border-b">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">{item.event_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Registrations;