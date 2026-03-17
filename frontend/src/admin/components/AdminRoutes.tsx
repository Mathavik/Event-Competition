import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Events from "../pages/Events";
import Registrations from "../pages/Registrations";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Category */}
      <Route path="categories" element={<Categories />} />

      {/* Events */}
      <Route path="events" element={<Events />} />

      {/* Registrations */}
      <Route path="registrations" element={<Registrations />} />
    </Routes>
  );
};

export default AdminRoutes;