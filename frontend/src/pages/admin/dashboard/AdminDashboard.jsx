import React from "react";
import AdminNav from "../AdminNav";

function AdminDashboard() {
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
              <h2 className="text-xl font-bold text-gray-700">Pending Queries</h2>
              <p className="text-3xl font-semibold text-blue-600">12</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
              <p className="text-3xl font-semibold text-green-600">2,356</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">Active Sellers</h2>
              <p className="text-3xl font-semibold text-orange-600">28</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">System Uptime</h2>
              <p className="text-3xl font-semibold text-purple-600">99.8%</p>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <button className="bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700">
              Manage Queries
            </button>
            <button className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:bg-green-700">
              Manage Sellers
            </button>
            <button className="bg-red-600 text-white p-4 rounded-lg shadow-md hover:bg-red-700">
              Manage Users
            </button>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Activities</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Admin approved 3 pending queries</li>
              <li>New seller "AgroTech Supplies" registered</li>
              <li>User "John Doe" updated account details</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
