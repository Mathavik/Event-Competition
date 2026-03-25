import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

// Define the Winner type
interface Winner {
  school_name: string;
  total_points: number;
  rank?: number;
  school_id?: string | number;
  logo?: string;
}

const OverallWinners: React.FC = () => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/overall-winners");
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching winners:", err);
      setError("Failed to load winners data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get rank display
  const getRankDisplay = (index: number) => {
    if (index === 0) return { label: "1st", icon: "🥇", color: "text-yellow-600", bgColor: "bg-yellow-100", borderColor: "border-yellow-300" };
    if (index === 1) return { label: "2nd", icon: "🥈", color: "text-gray-500", bgColor: "bg-gray-100", borderColor: "border-gray-300" };
    if (index === 2) return { label: "3rd", icon: "🥉", color: "text-amber-700", bgColor: "bg-amber-100", borderColor: "border-amber-300" };
    return { label: `${index + 1}th`, icon: "📊", color: "text-blue-600", bgColor: "bg-blue-100", borderColor: "border-blue-200" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block">
           <div className="flex items-center justify-center gap-3 mb-4">
  <span className="text-4xl drop-shadow-lg">🏆</span>
  <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
    Overall Trophy Winners
  </h1>
  <span className="text-4xl drop-shadow-lg">🏆</span>
</div>
            <div className="h-1 w-40 mx-auto bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full"></div>
            {/* <p className="text-gray-600 mt-5 text-lg font-medium">
              Celebrating excellence and outstanding achievement
            </p> */}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-yellow-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
            <p className="mt-5 text-gray-600 font-medium text-lg">Loading champions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6 max-w-2xl mx-auto shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-red-800 text-lg">Unable to load data</h3>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={fetchWinners}
              className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium shadow-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Winners Table */}
        {!loading && !error && data.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
            {/* Podium Preview for Top 3 - Modern Design */}
            {data.length >= 3 && (
              <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-8 border-b border-gray-200">
                <h2 className="text-center text-gray-600 font-semibold mb-8 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                  <span className="w-8 h-px bg-gray-300"></span>
                  🏅 TOP PERFORMERS 🏅
                  <span className="w-8 h-px bg-gray-300"></span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-10">
                  {/* 2nd Place */}
                  <div className="flex-1 max-w-[220px] text-center order-2 md:order-1 transform transition-all duration-300 hover:scale-105">
                    <div className="bg-gradient-to-t from-gray-100 to-gray-50 rounded-t-2xl p-5 h-36 flex flex-col justify-end relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-2xl shadow-md">
                        🥈
                      </div>
                      <div className="mt-6">
                        <div className="font-bold text-gray-800 text-lg truncate">{data[1]?.school_name || "—"}</div>
                        <div className="text-3xl font-extrabold text-gray-700 mt-2">{data[1]?.total_points || 0}</div>
                        <div className="text-xs text-gray-400 mt-1">points</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-b-lg font-semibold text-sm tracking-wide">
                      2ND PLACE
                    </div>
                  </div>
                  
                  {/* 1st Place - Champion */}
                  <div className="flex-1 max-w-[260px] text-center order-1 md:order-2 transform scale-105 md:scale-110 transition-all duration-300 hover:scale-115">
                    <div className="bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-t-2xl p-6 h-44 flex flex-col justify-end relative shadow-lg">
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg ring-4 ring-white">
                        👑
                      </div>
                      <div className="mt-8">
                        <div className="font-extrabold text-gray-900 text-xl truncate">{data[0]?.school_name || "—"}</div>
                        <div className="text-4xl font-black text-yellow-700 mt-2">{data[0]?.total_points || 0}</div>
                        <div className="text-xs text-yellow-600 font-semibold mt-1">total points</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 rounded-b-lg font-bold text-base tracking-wider">
                      CHAMPION
                    </div>
                  </div>
                  
                  {/* 3rd Place */}
                  <div className="flex-1 max-w-[220px] text-center order-3 transition-all duration-300 hover:scale-105">
                    <div className="bg-gradient-to-t from-amber-100 to-amber-50 rounded-t-2xl p-5 h-32 flex flex-col justify-end relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-2xl shadow-md">
                        🥉
                      </div>
                      <div className="mt-6">
                        <div className="font-bold text-gray-800 text-lg truncate">{data[2]?.school_name || "—"}</div>
                        <div className="text-3xl font-extrabold text-amber-700 mt-2">{data[2]?.total_points || 0}</div>
                        <div className="text-xs text-gray-400 mt-1">points</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-b-lg font-semibold text-sm tracking-wide">
                      3RD PLACE
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Rankings Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider w-28">RANK</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">SCHOOL / INSTITUTION</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider w-36">POINTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.map((item: Winner, index: number) => {
                    const rank = getRankDisplay(index);
                    return (
                      <tr
                        key={item.school_id || index}
                        className={`transition-all duration-200 hover:bg-gray-50 group cursor-pointer ${
                          index === 0 ? "bg-gradient-to-r from-yellow-50/30 to-transparent" :
                          index === 1 ? "bg-gradient-to-r from-gray-50/30 to-transparent" :
                          index === 2 ? "bg-gradient-to-r from-amber-50/30 to-transparent" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${rank.bgColor} ${rank.borderColor} border-2`}>
                              {rank.icon}
                            </div>
                            <span className={`font-bold text-base ${rank.color}`}>
                              {rank.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {index === 0 && <span className="text-xl">🏆</span>}
                            <span className={`font-semibold text-gray-800 ${index === 0 ? "text-lg" : "text-base"}`}>
                              {item.school_name}
                            </span>
                            {index === 0 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                WINNER
                              </span>
                            )}
                            {index === 1 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                RUNNER UP
                              </span>
                            )}
                            {index === 2 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-600">
                                SECOND RUNNER UP
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-baseline gap-2">
                            <span className={`font-extrabold text-2xl ${
                              index === 0 ? "text-yellow-600" :
                              index === 1 ? "text-gray-600" :
                              index === 2 ? "text-amber-600" :
                              "text-blue-600"
                            }`}>
                              {item.total_points}
                            </span>
                            <span className="text-sm text-gray-400 font-medium">pts</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Note */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <span>Total Participating Schools: <strong className="text-gray-700 font-bold">{data.length}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Live Rankings</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <span>Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="text-7xl mb-5">🏆</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Winners Data Yet</h3>
            <p className="text-gray-500 mb-8">Results will appear here once the competition concludes.</p>
            <button
              onClick={fetchWinners}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md font-medium"
            >
              Refresh Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallWinners;