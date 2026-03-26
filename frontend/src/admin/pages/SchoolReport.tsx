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
  Loader2
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

  // Filter data based on search
  const filteredData = data.filter((item) =>
    item.school_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
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

  // Statistics
  const totalStudents = data.reduce((sum, item) => sum + item.total_students, 0);
  const totalEvents = data.reduce((sum, item) => sum + item.total_events, 0);
  const averageStudentsPerSchool = data.length > 0 ? Math.round(totalStudents / data.length) : 0;

  const handleSort = (column: "name" | "students" | "events") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                School Reports
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive overview of school participation and achievements
              </p>
            </div>
            <button
              onClick={downloadPDF}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download size={20} />
              <span className="font-semibold">Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Schools</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{data.length}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <School className="text-amber-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{totalStudents.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{totalEvents.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="text-green-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="🔍 Search school by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleSort("name")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === "name"
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  School {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("students")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === "students"
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Students {sortBy === "students" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                  onClick={() => handleSort("events")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === "events"
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Events {sortBy === "events" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="animate-spin text-amber-500 mb-4" size={48} />
              <p className="text-gray-500">Loading school data...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <th className="p-4 text-left text-sm font-semibold text-gray-600">
                        <div className="flex items-center gap-2">
                          <School size={16} />
                          School Name
                        </div>
                      </th>
                      <th className="p-4 text-center text-sm font-semibold text-gray-600">
                        <div className="flex items-center justify-center gap-2">
                          <Users size={16} />
                          Total Students
                        </div>
                      </th>
                      <th className="p-4 text-center text-sm font-semibold text-gray-600">
                        <div className="flex items-center justify-center gap-2">
                          <Calendar size={16} />
                          Total Events
                        </div>
                      </th>
                      <th className="p-4 text-center text-sm font-semibold text-gray-600">
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp size={16} />
                          Performance
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.length > 0 ? (
                      sortedData.map((item, index) => {
                        const participationRate = item.total_events > 0 
                          ? Math.round((item.total_students / totalStudents) * 100) 
                          : 0;
                        
                        return (
                          <tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-amber-50 transition-colors duration-200"
                          >
                            <td className="p-4 font-medium text-gray-800">
                              <div className="flex items-center gap-2">
                                <Award size={16} className="text-amber-500" />
                                {item.school_name}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                                {item.total_students.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                                {item.total_events.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${participationRate}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500">{participationRate}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <FileText size={48} className="text-gray-300" />
                            <p className="text-gray-500 font-medium">No schools found</p>
                            <p className="text-gray-400 text-sm">
                              {searchTerm ? "Try adjusting your search" : "No data available"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Summary */}
              {sortedData.length > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
                    <div>
                      Showing <strong>{sortedData.length}</strong> of <strong>{data.length}</strong> schools
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                        <span>Students Count</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-100 rounded-full"></div>
                        <span>Events Count</span>
                      </div>
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