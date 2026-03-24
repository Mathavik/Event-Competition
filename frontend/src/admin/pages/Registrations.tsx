import React, { useEffect, useState } from "react";
import api from "../../api"; 
import { FaUserGraduate, FaInbox, FaIdBadge } from "react-icons/fa";

interface Registration {
  id: number;
  name: string;
  email: string;
  event_id: number;
}

const Registrations: React.FC = () => {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get("/registrations")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching registrations:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
             Registrations
          </h2>
          <p className="text-slate-500 text-sm font-medium">Review and manage student event enrollments.</p>
        </div>
        
        <div className="bg-slate-950 border border-amber-500/30 px-4 py-2 rounded-xl shadow-lg shadow-amber-500/5">
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest block leading-none mb-1 text-center">Total Students</span>
          <span className="text-white text-xl font-black block text-center leading-none">
            {data.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-amber-500 uppercase text-[11px] font-bold tracking-widest border-b border-amber-500/10">
                <th className="p-5 text-center w-20">ID</th>
                <th className="p-5">Student Information</th>
                <th className="p-5">Contact Detail</th>
                <th className="p-5 text-center">Event Track</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center">
                       <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                       <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Records...</p>
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-5 text-center text-slate-400 font-mono text-xs">#{item.id}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                          {React.createElement(FaUserGraduate as any, { size: 16 })}
                        </div>
                        <span className="text-slate-800 font-bold uppercase text-sm tracking-tight">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        {React.createElement(FaInbox as any, { size: 14, className: "text-slate-300" })}
                        <span className="text-xs font-medium">{item.email}</span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="inline-flex items-center gap-2 bg-slate-950 text-amber-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm mx-auto">
                        {React.createElement(FaIdBadge as any, { size: 12 })}
                        EVT-{item.event_id}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-400">
                    <div className="opacity-30 flex flex-col items-center">
                      {/* FIXED ERROR HERE */}
                      {React.createElement(FaInbox as any, { size: 40, className: "mb-2" })}
                      <p className="font-bold uppercase text-xs tracking-widest">No active registrations found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registrations;