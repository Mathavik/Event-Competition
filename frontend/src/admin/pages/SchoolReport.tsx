import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Download, 
  School, 
  Users, 
  Calendar, 
  TrendingUp,
  Award,
  FileText,
  Loader2,
  Search
} from "lucide-react";

type SchoolData = {
  school_name: string;
  total_students: number;
  total_events: number;
};

const SchoolReport = () => {
  const [data, setData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "students" | "events">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/school-report");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching report", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    window.open("http://localhost:8000/api/school-report/download", "_blank");
  };

  const filteredData = data.filter((item) =>
    item.school_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    if (sortBy === "name") {
      comparison = a.school_name.localeCompare(b.school_name);
    } else if (sortBy === "students") {
      comparison = a.total_students - b.total_students;
    } else if (sortBy === "events") {
      comparison = a.total_events - b.total_events;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const totalStudents = data.reduce((sum, item) => sum + item.total_students, 0);
  const totalEvents = data.reduce((sum, item) => sum + item.total_events, 0);

  const handleSort = (column: "name" | "students" | "events") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                School <span className="text-amber-500">Analytics</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium italic">
                Comprehensive overview of school participation and achievements.
              </p>
            </div>
            <button
              onClick={downloadPDF}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl shadow-amber-600/20 font-black uppercase text-[10px] tracking-widest active:scale-95"
            >
              <Download size={18} />
              Generate PDF Report
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <School size={80} className="text-amber-500" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Registered Institutions</p>
            <p className="text-4xl font-black text-white tracking-tight">{data.length.toString().padStart(2, '0')}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Users size={80} className="text-blue-500" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Engaged Students</p>
            <p className="text-4xl font-black text-white tracking-tight">{totalStudents.toLocaleString()}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Calendar size={80} className="text-emerald-500" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Active Event Tracks</p>
            <p className="text-4xl font-black text-white tracking-tight">{totalEvents.toLocaleString()}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-6 mb-10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-4 text-slate-600 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="SEARCH INSTITUTION BY NAME..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-white font-bold text-xs tracking-widest outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-700 uppercase"
              />
            </div>
            
            <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              {(["name", "students", "events"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleSort(tab)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    sortBy === tab
                      ? "bg-amber-600 text-white shadow-lg"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab} {sortBy === tab && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-3xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="animate-spin text-amber-500 mb-6" size={48} />
              <p className="text-slate-600 font-black uppercase text-[10px] tracking-[0.3em]">Accessing Data Core...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800">
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">School Identity</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Population</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Event Quota</th>
                      <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Participation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {sortedData.length > 0 ? (
                      sortedData.map((item, index) => {
                        const participationRate = totalStudents > 0 
                          ? Math.round((item.total_students / totalStudents) * 100) 
                          : 0;
                        
                        return (
                          <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-amber-500 border border-slate-700 transition-colors">
                                  <Award size={18} />
                                </div>
                                <span className="font-black text-white uppercase text-sm tracking-tight group-hover:text-amber-500 transition-colors">
                                  {item.school_name}
                                </span>
                              </div>
                            </td>
                            <td className="p-6 text-center">
                              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-xl text-xs font-black">
                                {item.total_students.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-6 text-center">
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-xl text-xs font-black">
                                {item.total_events.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-6">
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-32 bg-slate-950 rounded-full h-1.5 border border-slate-800 p-[1px]">
                                  <div
                                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                    style={{ width: `${participationRate}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-slate-600 font-black tracking-widest">{participationRate}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-32 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-20">
                            <FileText size={60} className="text-slate-600" />
                            <p className="font-black uppercase text-xs tracking-[0.4em]">No Records Found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Summary */}
              {sortedData.length > 0 && (
                <div className="bg-slate-900/50 px-8 py-5 border-t border-slate-800 flex flex-wrap justify-between items-center">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Showing {sortedData.length} of {data.length} Institutions
                  </p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Student Vol.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Event Cap.</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolReport;