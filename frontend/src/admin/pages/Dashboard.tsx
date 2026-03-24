import React, { useState } from "react";

const Dashboard: React.FC = () => {
  // Hardcoded counts
  const [counts] = useState({
    categories: 5,
    events: 12,
    registrations: 48,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
          <h3 className="text-gray-500 font-medium">Total Categories</h3>
          <p className="text-4xl font-bold mt-2 text-pink-600">{counts.categories}</p>
        </div>

        {/* Events Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <h3 className="text-gray-500 font-medium">Total Events</h3>
          <p className="text-4xl font-bold mt-2 text-blue-600">{counts.events}</p>
        </div>

        {/* Registrations Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <h3 className="text-gray-500 font-medium">Total Registrations</h3>
          <p className="text-4xl font-bold mt-2 text-green-600">{counts.registrations}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;