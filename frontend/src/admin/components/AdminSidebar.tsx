import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const linkClass =
    "block py-2 px-4 rounded hover:bg-pink-200 transition";

  return (
    <div className="w-64 h-screen bg-pink-500 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>

        <NavLink to="/admin/events" className={linkClass}>
          Events
        </NavLink>

        <NavLink to="/admin/registrations" className={linkClass}>
          Registrations
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;