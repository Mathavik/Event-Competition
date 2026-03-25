import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const OverallWinners = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axiosInstance.get("/overall-winners")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🏆 Overall Trophy Winners
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-center shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">School</th>
              <th className="p-3">Points</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border hover:bg-gray-100">
                <td className="p-3 font-bold text-lg">
                  {index === 0 ? "🥇 1st" :
                   index === 1 ? "🥈 2nd" :
                   index === 2 ? "🥉 3rd" :
                   index + 1}
                </td>

                <td className="p-3">{item.school_name}</td>
                <td className="p-3">{item.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverallWinners;