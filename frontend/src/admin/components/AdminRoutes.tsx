import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Events from "../pages/adminEvents";
import Registrations from "../pages/Registrations";
import Winners from "../pages/Winners";
import AdminGallery from "../pages/AdminGallery";
import AdminLayout from "./AdminLayout";
import SchoolReport from "../pages/SchoolReport";

const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        {/* URL /admin nu vantha auto-ah dashboard-ku pogum */}
        <Route index element={<Navigate to="admindashboard" replace />} />
        
        <Route path="admindashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="adminEvents" element={<Events />} />
        <Route path="adminGallery" element={<AdminGallery />} />
        <Route path="registrations" element={<Registrations />} />
        <Route path="winners" element={<Winners />} />
        <Route path="school-report" element={<SchoolReport />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;