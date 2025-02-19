import React from "react";
import ExpertNav from "../ExpertNav";
import { FaRegCheckCircle, FaClock, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExpertDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ExpertNav />
      
      {/* Dashboard Header */}
      <div className="p-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold">Expert Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Expert! Here's an overview of your activity.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center">
          <FaRegCheckCircle className="text-green-500 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Answered Queries</h2>
            <p className="text-2xl font-bold">34</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center">
          <FaClock className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Pending Queries</h2>
            <p className="text-2xl font-bold">7</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center">
          <FaClipboardList className="text-blue-500 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Queries</h2>
            <p className="text-2xl font-bold">41</p>
          </div>
        </div>
      </div>

      {/* Recent Queries Section */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Queries</h2>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="text-left p-3">Farmer Name</th>
                <th className="text-left p-3">Query</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Ali Khan</td>
                <td className="p-3">How to prevent fungal infections in wheat?</td>
                <td className="p-3 text-yellow-500">Pending</td>
                <td className="p-3">
                  <Link to="/expert/write-your-answer" className="text-blue-500 font-semibold">
                    Answer
                  </Link>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Sara Ahmed</td>
                <td className="p-3">Best pesticide for tomato leaf miners?</td>
                <td className="p-3 text-green-500">Answered</td>
                <td className="p-3">
                  <Link to="/expert/your-answered-queries" className="text-blue-500 font-semibold">
                    View Answer
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3">Mohsin Raza</td>
                <td className="p-3">How to improve soil fertility naturally?</td>
                <td className="p-3 text-yellow-500">Pending</td>
                <td className="p-3">
                  <Link to="/expert/write-your-answer" className="text-blue-500 font-semibold">
                    Answer
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link to="/expert/forum" className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg">
            View Discussion Forum
          </Link>
          <Link to="/expert/write-your-answer" className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg">
            Answer a Query
          </Link>
          <Link to="/expert/your-answered-queries" className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg">
            Your Answered Queries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
