import { useEffect, useState } from "react";
import axios from "axios";

type SchoolData = {
  school_name: string;
  total_students: number;
  total_events: number;
};

const SchoolReport = () => {
  const [data, setData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-amber-500">
        School Reports
      </h2>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Table */}
      {!loading && (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">School</th>
              <th className="p-2 border">Total Students</th>
              <th className="p-2 border">Total Events</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.school_name}</td>
                  <td className="p-2 border">{item.total_students}</td>
                  <td className="p-2 border">{item.total_events}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SchoolReport;