import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Events from "../pages/adminEvents";
import Registrations from "../pages/Registrations";
import AdminLogin from "./AdminLogin";
import AdminGallery from "../pages/AdminGallery";
import Winners from "../pages/Winners";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/admindashboard" element={<Dashboard />} />

      {/* Category */}
      <Route path="categories" element={<Categories />} />

      {/* Events */}
      <Route path="adminEvents" element={<Events />} />
      <Route path="adminGallery" element={<AdminGallery />} />
      

      {/* Registrations */}
      <Route path="registrations" element={<Registrations />} />
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="winners" element={<Winners />} />


    </Routes>
  );
};

export default AdminRoutes;