import React from "react";

const AdminHeader: React.FC = () => {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default AdminHeader;