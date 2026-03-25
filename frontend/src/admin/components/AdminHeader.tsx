import React, { useEffect, useState } from "react";
import { LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  // 🔔 Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔴 Fetch unread count
  const fetchCount = async () => {
    try {
      const res = await axiosInstance.get("/admin/notifications/unread-count");
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Mark as read
  const markAsRead = async () => {
axiosInstance.post("/admin/notifications/read");
    setCount(0);
  };

  useEffect(() => {
    fetchNotifications();
    fetchCount();

    // 🔁 auto refresh every 5 sec
    const interval = setInterval(() => {
      fetchNotifications();
      fetchCount();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-slate-950 border-b border-amber-500/20 flex items-center justify-end px-8 shadow-2xl relative z-50">
      
      <div className="flex items-center gap-6">

        {/* 🔔 Notification Bell */}
        <div className="relative">
          <button onClick={() => {
            setOpen(!open);
            markAsRead();
          }}>
            <Bell className="text-white" size={20} />
          </button>

          {/* 🔴 Badge */}
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full text-white">
              {count}
            </span>
          )}

          {/* 📩 Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-lg max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-400 text-sm">No notifications</p>
              ) : (
                notifications.map((n, i) => (
                  <div key={i} className="p-3 border-b border-slate-800 text-sm text-white">
                    {n.data.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-right hidden sm:block border-r border-slate-800 pr-6">
          <p className="text-white text-xs font-black uppercase tracking-wider">
            Admin User
          </p>
          <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">
            Super Admin
          </p>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-600 text-amber-500 hover:text-slate-950 font-black uppercase text-[10px] tracking-[0.15em] rounded-xl transition-all duration-300"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
};

export default AdminHeader;