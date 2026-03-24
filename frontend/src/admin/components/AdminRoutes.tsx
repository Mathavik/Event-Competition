import React from "react";
// Added 'Outlet' to the imports below
import { Routes, Route, Navigate, Outlet } from "react-router-dom"; 
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Events from "../pages/adminEvents";
import Registrations from "../pages/Registrations";
import Winners from "../pages/Winners";
import AdminGallery from "../pages/AdminGallery";
// import AdminLayout from "./AdminLayout";
import SchoolReport from "../pages/SchoolReport";
import AdminLogin from "./AdminLogin";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Login page stays outside the Layout (No Sidebar/Header) */}
      <Route path="adminlogin" element={<AdminLogin />} />

      {/* 2. Parent Route using the Layout */}
      {/* <Route element={<AdminLayout />}> */}
        {/* These children will render inside the AdminLayout's <Outlet /> */}
        <Route index element={<Navigate to="admindashboard" replace />} />
        <Route path="admindashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="adminEvents" element={<Events />} />
        <Route path="adminGallery" element={<AdminGallery />} />
        <Route path="registrations" element={<Registrations />} />
        <Route path="winners" element={<Winners />} />
        <Route path="school-report" element={<SchoolReport />} />
      {/* </Route> */}
    </Routes>
  );
};

export default AdminRoutes;