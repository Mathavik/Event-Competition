import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("admin"); // optional

    // 🔁 Redirect to login page
    navigate("/adminlogin");
  };

  return (
    <header className="h-16 bg-slate-950 border-b border-amber-500/20 flex items-center justify-end px-8 shadow-2xl relative z-50">
      
      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        {/* User Info */}
        <div className="text-right hidden sm:block border-r border-slate-800 pr-6">
          <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">
            Admin User
          </p>
          <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest leading-none">
            Super Admin
          </p>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-600 text-amber-500 hover:text-slate-950 font-black uppercase text-[10px] tracking-[0.15em] rounded-xl transition-all duration-300 active:scale-95 shadow-lg hover:shadow-amber-500/20"
        >
          <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
};

export default AdminHeader;