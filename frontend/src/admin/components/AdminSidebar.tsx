import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminSidebar: React.FC = () => {
  // Header-oda theme-ku etha maari Amber accent colors
  const linkClass = "block py-3 px-4 rounded-lg transition-all duration-300 font-semibold mb-2 tracking-wide text-sm uppercase";
  const activeClass = "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20";
  const hoverClass = "hover:bg-slate-800 text-slate-300 hover:text-amber-500";

  return (
    // Background-ai bg-slate-950 ah mathi, border-ai amber-500/20 ah mathiruken
    <div className="w-64 min-h-full bg-slate-950 text-white p-5 flex-shrink-0 border-r border-amber-500/20">

      {/* Logo Section - Header-la irukura maari amber border bottom */}
      <div className="flex items-center justify-center mb-8 border-b border-amber-500/30 pb-6">
        <img
          src={logo}
          alt="Admin Logo"
          className="h-14 w-auto object-contain"
        />
      </div>

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

        <NavLink to="/admin/adminGallery" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Gallery
        </NavLink>

        <NavLink to="/admin/registrations" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Registrations
        </NavLink>

 <NavLink to="/admin/participation-certificate" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Participation Certificate
        </NavLink>


        <NavLink to="/admin/winners" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Winners
        </NavLink>
        <NavLink
          to="/admin/school-report"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}
        >
          School Reports
        </NavLink>
        <NavLink
          to="/admin/ads"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}
        >
          Advertisements
        </NavLink>
        <NavLink
          to="/admin/overall-winners"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}
        >
          Overall Winners
        </NavLink>
        <NavLink to="/admin/certificate" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
          Certificate setting
        </NavLink>
      </nav>

      {/* Optional: Bottom decoration to match Header's glow */}
      <div className="mt-auto pt-10 opacity-20 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default AdminSidebar;