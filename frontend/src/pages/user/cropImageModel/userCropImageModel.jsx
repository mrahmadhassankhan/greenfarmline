import React, { useEffect, useState } from "react";
import UserNav from "../UserNav";

function userCropImageModel() {
  const [detectionHistory, setDetectionHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userEmail = localStorage.getItem("email"); // Get user data
      const userRole = localStorage.getItem("role");
      const userData = {email: userEmail, role: userRole}
      if (!userData || userData.role !== "farmer") {
        alert("Access denied! Only farmers can view detection history.");
        return;
      }

      const farmerEmail = userData.email; // Get farmer's ID

      try {
        const response = await fetch(`http://localhost:1783/api/detections/history/${farmerEmail}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setDetectionHistory(data);
      } catch (error) {
        console.error("Error fetching detection history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <UserNav />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Crop Disease Detection History</h2>
          <p className="text-gray-600">View all your past crop disease detection results.</p>

          {detectionHistory.length === 0 ? (
            <p className="text-gray-500 mt-4">No detection history found.</p>
          ) : (
            <div className="mt-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">#</th>
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Detected Disease</th>
                    <th className="border p-2">Confidence</th>
                    <th className="border p-2">Recommendations</th>
                    <th className="border p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {detectionHistory.map((entry, index) => (
                    <tr key={index} className="text-center">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">
                        <img src={entry.imageUrl} alt="Crop" className="w-16 h-16 rounded" />
                      </td>
                      <td className="border p-2">{entry.disease}</td>
                      <td className="border p-2">{(entry.confidence).toFixed(2)}%</td>
                      <td className="border p-2">{entry.recommendations}</td>
                      <td className="border p-2">{new Date(entry.detectedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default userCropImageModel;
