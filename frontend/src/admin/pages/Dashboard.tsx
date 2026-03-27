import React, { useState } from "react";
import { LayoutGrid, CalendarDays, UserCheck, TrendingUp } from "lucide-react";

const Dashboard: React.FC = () => {
  // Hardcoded counts (Future-la API la irunthu fetch pannikalam)
  const [counts] = useState({
    categories: 5,
    events: 12,
    registrations: 48,
  });

  const stats = [
    {
      label: "Total Categories",
      value: counts.categories,
      icon: <LayoutGrid className="w-6 h-6 text-pink-500" />,
      color: "border-pink-500",
      bg: "bg-pink-500/10",
      description: "Organized groups"
    },
    {
      label: "Total Events",
      value: counts.events,
      icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
      color: "border-blue-500",
      bg: "bg-blue-500/10",
      description: "Active competitions"
    },
    {
      label: "Total Registrations",
      value: counts.registrations,
      icon: <UserCheck className="w-6 h-6 text-emerald-500" />,
      color: "border-emerald-500",
      bg: "bg-emerald-500/10",
      description: "Joined students"
    },
  ];

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white tracking-tight">
          DASHBOARD <span className="text-amber-500">OVERVIEW</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`relative overflow-hidden bg-slate-900 border border-slate-800 p-6 rounded-2xl transition-all duration-300 hover:border-slate-600 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] group`}
          >
            {/* Background Glow Decor */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-5xl font-black text-white mt-2 mb-2 italic">
                  {stat.value.toLocaleString()}
                </h3>
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" /> 
                  {stat.description}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} border border-white/5`}>
                {stat.icon}
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-slate-400 to-transparent group-hover:w-full transition-all duration-500`} />
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Dashboard;