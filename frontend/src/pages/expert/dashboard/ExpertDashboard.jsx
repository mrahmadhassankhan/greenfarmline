import React, { useEffect, useState } from "react";
import ExpertNav from "../ExpertNav";
import { FaRegCheckCircle, FaClock, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Axios_Node } from "../../../Axios";

const expert = () => {
  const expertEmail = JSON.parse(localStorage.getItem("user")).email;
  const expertName = JSON.parse(localStorage.getItem("user")).name;

  const navigate = useNavigate();

  // State for counts
  const [totalQueries, setTotalQueries] = useState(0);
  const [answeredQueries, setAnsweredQueries] = useState(0);
  const [pendingQueries, setPendingQueries] = useState(0);
  const [recentQueries, setRecentQueries] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchCounts();
    fetchRecentQueries();
  }, []);

  const fetchCounts = async () => {
    try {
      // Fetch total approved queries
      const approvedResponse = await Axios_Node.get(
        "/query/getapprovedqueries"
      );
      const approvedQueries = Array.isArray(approvedResponse.data.data)
        ? approvedResponse.data.data
        : [];

      // Fetch answered queries by expert
      let answeredQueriesData = [];
      try {
        const answeredResponse = await Axios_Node.get(
          `/answer/expert/${expertEmail}`
        );
        answeredQueriesData = Array.isArray(answeredResponse.data)
          ? answeredResponse.data
          : [];
      } catch (error) {
        console.warn("No answered queries found for this expert.");
      }

      // Calculate counts safely
      const total = approvedQueries.length ?? 0;
      const answered = answeredQueriesData.length ?? 0;
      const pending = total - answered;

      setTotalQueries(total);
      setAnsweredQueries(answered);
      setPendingQueries(isNaN(pending) ? 0 : pending);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  const fetchRecentQueries = async () => {
    try {
      const response = await Axios_Node.get("/query/getapprovedqueries");

      if (Array.isArray(response.data.data)) {
        setRecentQueries(response.data.data.slice(0, 3)); // Take latest 3 queries
      } else {
        setRecentQueries([]); // Set empty array to prevent errors
      }
    } catch (error) {
      console.error("Error fetching recent queries:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ExpertNav />

      {/* Dashboard Header */}
      <div className="p-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold">Expert Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {expertName}! Here's an overview of your activity.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center">
          <FaRegCheckCircle className="text-green-500 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Answered Queries</h2>
            <p className="text-2xl font-bold">{answeredQueries}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center">
          <FaClock className="text-yellow-500 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Pending Queries</h2>
            <p className="text-2xl font-bold">{pendingQueries ?? 0}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center">
          <FaClipboardList className="text-blue-500 text-4xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Total Queries</h2>
            <p className="text-2xl font-bold">{totalQueries}</p>
          </div>
        </div>
      </div>

      {/* Recent Queries Section */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Recent Queries
        </h2>
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
              {recentQueries.length > 0 ? (
                recentQueries.map((query) => (
                  <tr key={query._id} className="border-b">
                    <td className="p-3">{query.name || "Unknown"}</td>
                    <td className="p-3">{query.title}</td>
                    <td
                      className={`p-3 ${
                        query.answers.length > 0
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {query.answers.length > 0 ? "Answered" : "Pending"}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate("/write-your-answer", { state: { query } })
                        }
                        className="text-blue-500 font-semibold"
                      >
                        {query.answers.length > 0 ? "View Answer" : "Answer"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3">
                    No recent queries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/discussionforum"
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg"
          >
            View Discussion Forum
          </Link>
          <Link
            to="/expertforumview"
            className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg"
          >
            Answer a Query
          </Link>
          <Link
            to="/your-answered-queries"
            className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center shadow-lg"
          >
            Your Answered Queries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default expert;
