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
  import CreateAd from "./CreateAd";
  import OverallWinners from "../pages/OverallWinners";
import AdminLogin from "./AdminLogin";
import CertificateSettings from "../pages/CertificateSettings";

  const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Login page - Layout இல்லமால் தனியாகத் தெரியும் */}
      <Route path="adminlogin" element={<AdminLogin />} />

      {/* 2. மற்ற அனைத்து பக்கங்களும் Layout-க்குள் வரும் */}
      <Route
        path="*"
        element={
          <AdminLayout>
            <Routes>
              <Route index element={<Navigate to="admindashboard" replace />} />
              <Route path="admindashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="adminEvents" element={<Events />} />
              <Route path="adminGallery" element={<AdminGallery />} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="certificate" element={<CertificateSettings />} />

              <Route path="winners" element={<Winners />} />
              <Route path="school-report" element={<SchoolReport />} />
              <Route path="ads" element={<CreateAd />} />
              <Route path="overall-winners" element={<OverallWinners />} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
};

  export default AdminRoutes;