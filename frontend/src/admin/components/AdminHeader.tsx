import React from "react";

const AdminHeader: React.FC = () => {
  return (
    // Background Slate-950, Header border and shadow match panniruken
    <div className="h-16 bg-slate-950 border-b border-amber-500/20 flex items-center justify-between px-8 shadow-xl relative z-10">
      
      {/* LEFT SIDE: Management Console Title */}
      <h1 className="text-xl font-extrabold text-white tracking-tight">
        Management <span className="text-amber-500 font-light italic">Console</span>
      </h1>

      {/* RIGHT SIDE: Profile Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-100 leading-none">Admin User</p>
          {/* Pink-ku pathila Amber text use panniruken */}
          <p className="text-xs text-amber-500 font-semibold mt-1 uppercase tracking-tighter">
            Super Admin
          </p>
        </div>
        
        {/* Profile Image with Amber Glow Effect */}
        <div className="relative group cursor-pointer">
          {/* Header-la irukura glow effect inge profile-ku match aagum */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
          <img
            src="https://i.pravatar.cc/40?img=32" 
            alt="profile"
            className="relative w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;