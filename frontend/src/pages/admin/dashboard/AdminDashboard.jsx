import React from "react";
import AdminNav from "../AdminNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Axios_Node } from "../../../Axios";

function AdminDashboard() {
  const [pendingQueriesCount, setPendingQueriesCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [activities, setActivities] = useState([]);
  const [systemUptime, setSystemUptime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch only pending queries count from the backend when the component is mounted
    const fetchQueries = async () => {
      try {
        const response = await Axios_Node.get("/query/getpendingqueries");

        if (Array.isArray(response.data.data)) {
          setPendingQueriesCount(response.data.data.length);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching pending queries:", error);
      }
    };

    fetchQueries();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios_Node.get("/admin/users");

        setUserCount(response.data.count);
        setSellerCount(response.data.sellersCount);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch recent activities
  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await Axios_Node.get("/admin/recent-activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchRecentActivities();

    // Fetch new activities every 10 seconds
    const interval = setInterval(fetchRecentActivities, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUptime = async () => {
      try {
        const response = await Axios_Node.get("/uptime");
        setSystemUptime(response.data.uptime);
      } catch (error) {
        console.error("Error fetching uptime:", error);
      }
    };

    fetchUptime();

    // Refresh uptime every 10 seconds
    const interval = setInterval(fetchUptime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AdminNav />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          {/* Dashboard Header */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Admin Dashboard
          </h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">
                Pending Queries
              </h2>
              <p className="text-3xl font-semibold text-blue-600">
                {pendingQueriesCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
              <p className="text-3xl font-semibold text-green-600">
                {userCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">
                Active Sellers
              </h2>
              <p className="text-3xl font-semibold text-orange-600">
                {sellerCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">System Uptime</h2>
              <p className="text-3xl font-semibold text-purple-600">
                {systemUptime}
              </p>
              {/* <p className="text-3xl font-semibold text-purple-600">99.8%</p> */}
            </div>
          </div>

          {/* Admin Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <button
              onClick={() => navigate("/pending-queries")}
              className="bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700"
            >
              Manage Queries
            </button>
            <button
              onClick={() => navigate("/seller-management")}
              className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700"
            >
              Manage Sellers
            </button>
            <button
              onClick={() => navigate("/user-management")}
              className="bg-red-600 text-white p-4 rounded-lg shadow-md hover:bg-red-700"
            >
              Manage Users
            </button>
          </div>

          {/* // Recent Activities
          <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activities</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Admin approved 3 pending queries</li>
              <li>New seller "AgroTech Supplies" registered</li>
              <li>User "John Doe" updated account details</li>
            </ul>
          </div> */}
          {/* Recent Activities Section */}
          <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Recent Activities
            </h2>
            <ul className="list-disc pl-5 text-gray-600">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <li key={index}>
                    {activity.message} -{" "}
                    <span className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </li>
                ))
              ) : (
                <li>No recent activities.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
