import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";

const Dashboard: React.FC = () => {
  // Hardcoded counts instead of fetching from API
  const [counts] = useState({
    categories: 5,
    events: 12,
    registrations: 48,
  });

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Categories</h3>
          <p className="text-3xl">{counts.categories}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Events</h3>
          <p className="text-3xl">{counts.events}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Registrations</h3>
          <p className="text-3xl">{counts.registrations}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;