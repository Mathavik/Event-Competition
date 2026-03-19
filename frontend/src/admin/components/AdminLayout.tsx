import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    // min-h-screen window full height cover pannum
    // items-stretch sidebar-ai content bottom varai stretch pannum
    <div className="flex min-h-screen items-stretch bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout