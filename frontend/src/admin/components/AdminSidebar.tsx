import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const linkClass = "block py-2 px-4 rounded transition font-medium mb-2";
  const activeClass = "bg-pink-700 text-white shadow-md";
  const hoverClass = "hover:bg-pink-600 text-white";

  return (
    // min-h-full kudutha thaan layout stretch aagum pothu sidebar-um koodave varum
    <div className="w-64 min-h-full bg-pink-500 text-white p-5 flex-shrink-0 border-r border-pink-600">
      <h2 className="text-2xl font-bold mb-8 border-b border-pink-400 pb-4">Admin Panel</h2>

      <nav className="flex flex-col">
        <NavLink to="/admin" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/categories" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Categories
        </NavLink>

        <NavLink to="/admin/adminEvents" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Events
        </NavLink>

        <NavLink to="/admin/registrations" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Registrations
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;