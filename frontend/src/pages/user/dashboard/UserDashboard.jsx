import React from "react";
import UserNav from "../UserNav";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <>
      <UserNav />
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Welcome Message */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, Farmer!</h2>
          <p className="text-gray-600">Manage your orders, participate in discussions, and check your crop health.</p>
        </div>

        {/* Grid Layout for Quick Actions & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/userforumview" className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700">Visit Forum</Link>
              <Link to="/userorders" className="block bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700">View Orders</Link>
              <Link to="/cropdisease" className="block bg-yellow-500 text-white text-center py-2 rounded-md hover:bg-yellow-600">Check Crop Disease</Link>
              <Link to="/shop" className="block bg-gray-700 text-white text-center py-2 rounded-md hover:bg-gray-800">Go to Store</Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border">
                <span>Order #12345 - Machinery</span>
                <span className="text-green-600">Delivered</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border">
                <span>Order #12346 - Fertilizers</span>
                <span className="text-yellow-500">In Transit</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border">
                <span>Order #12347 - Pesticides</span>
                <span className="text-red-500">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forum Activity & Crop Disease Detection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Forum Activity */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Latest Forum Discussions</h3>
            <div className="space-y-3">
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border">
                <span>How to protect wheat from pests?</span>
                <span className="text-gray-500">2 Replies</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border">
                <span>Best fertilizers for soil health?</span>
                <span className="text-gray-500">5 Replies</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border">
                <span>Crop rotation benefits?</span>
                <span className="text-gray-500">3 Replies</span>
              </div>
            </div>
          </div>

          {/* Crop Disease Detection */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Crop Disease Detection</h3>
            <p className="text-gray-600 mb-4">Upload an image of your crop, and our AI will detect any diseases.</p>
            <div className="border-dashed border-2 border-gray-300 p-6 text-center">
              <p className="text-gray-500">Drag & Drop Image Here</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Upload Image</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
