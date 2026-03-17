import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <AdminHeader />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;