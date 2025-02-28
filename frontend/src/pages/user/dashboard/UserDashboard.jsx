import React, { useEffect, useState } from "react";
import UserNav from "../UserNav";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios_Flask } from "../../../Axios";
import { Axios_Node } from "../../../Axios";

function UserDashboard() {
  const userEmail = JSON.parse(localStorage.getItem("user")).email;
  const userName = JSON.parse(localStorage.getItem("user")).name;
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  const user = { email: userEmail, name: userName, role: userRole };

  // State for handling image upload and detection results
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for orders and forum queries
  const [orders, setOrders] = useState([]);
  const [queries, setQueries] = useState([]);

  // Handle image selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Send image to backend for detection
  const handleDetectDisease = async () => {
    if (!selectedImage) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await Axios_Flask.post(
        "/predict", // Your API endpoint
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const detectionData = response.data;
      setDetectionResult(detectionData); // Store prediction result
      // If user is a farmer, store detection result in database
      if (user.role === "farmer") {
        await Axios_Node.post(
          "/detections/save",
          {
            user,
            disease: detectionData.prediction,
            confidence: detectionData.confidence * 100,
            recommendations: detectionData.recommendations,
            imageUrl: previewUrl, // Temporary URL for preview
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        toast.success("Detection result saved successfully.");
      }
    } catch (error) {
      console.error("Error detecting disease:", error);
      alert("Failed to detect disease. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    // Fetch user's orders using admin orders API
    const fetchOrders = async () => {
      try {
        const response = await Axios_Node.get(
          `/admin/orders?email=${userEmail}`
        );
        if (response.data.success && response.data.orders.length > 0) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        // Only log errors other than 404
        if (error.response && error.response.status !== 404) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    const fetchQueries = async () => {
      try {
        const response = await Axios_Node.get("/query/getapprovedqueries");
        if (response.data.data.length == 0) {
          setQueries([]);
        } else {
          let latestQueries = response.data.data.slice(-3); // Get last 3 approved queries

          // Fetch replies count for each query
          const queriesWithReplies = await Promise.all(
            latestQueries.map(async (query) => {
              try {
                const replyResponse = await Axios_Node.get(
                  `/answer/answers/${query._id}`
                );
                return {
                  ...query,
                  replyCount: replyResponse.data.answers.length,
                };
              } catch (error) {
                console.error("Error fetching replies:", error);
                return { ...query, replyCount: 0 };
              }
            })
          );

          setQueries(queriesWithReplies);
        }
      } catch (error) {
        // Only log errors other than 404
        if (error.response && error.response.status !== 404) {
          console.error("Error fetching approved queries:", error);
        }
      }
    };
    fetchOrders();
    fetchQueries();
  }, [userEmail]);

  return (
    <>
      <UserNav />
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Welcome Message */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {userName}!
          </h2>
          <p className="text-gray-600">
            Manage your orders, participate in discussions, and check your crop
            health.
          </p>
        </div>

        {/* Grid Layout for Quick Actions & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/userforumview"
                className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
              >
                Visit Forum
              </Link>
              <Link
                to="/user-orders"
                className="block bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700"
              >
                View Orders
              </Link>
              <Link
                to="/crop-image-model"
                className="block bg-yellow-500 text-white text-center py-2 rounded-md hover:bg-yellow-600"
              >
                Check Crop Disease
              </Link>
              <Link
                to="/ecommerce-store"
                className="block bg-gray-700 text-white text-center py-2 rounded-md hover:bg-gray-800"
              >
                Go to Store
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {orders.length > 0 ? (
                orders.slice(0, 3).map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between bg-gray-50 p-3 rounded-md border"
                  >
                    {/* <span>Order #{order._id} - {order.items[0]?.name || "Item"}</span> */}
                    <span>
                      Order #{order._id} - {order.createdAt || "Invalid Date"}
                    </span>
                    <span
                      className={`text-${
                        order.delivered === "Delivered"
                          ? "green"
                          : order.delivered === "pending"
                          ? "yellow"
                          : "red"
                      }-500 capitalize`}
                    >
                      {order.delivered}
                    </span>
                  </div>
                ))
              ) : (
                <p>No recent orders found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Forum Activity & Crop Disease Detection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Forum Activity */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Latest Forum Discussions
            </h3>
            <div className="space-y-3">
              {queries.length > 0 ? (
                queries.map((query) => (
                  <div
                    key={query._id}
                    className="flex justify-between bg-gray-50 p-3 rounded-md border"
                  >
                    <span>{query.title}</span>
                    <span className="text-gray-500">
                      {query.replyCount} Replies
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent forum queries found.</p>
              )}
            </div>
          </div>

          {/* Crop Disease Detection Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Crop Disease Detection
            </h3>
            <p className="text-gray-600 mb-4">
              Upload an image of your crop, and our AI will detect any diseases.
            </p>

            {/* Image Upload & Preview */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            {previewUrl && (
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md border"
                />
              </div>
            )}

            <div className="text-right">
              <button
                onClick={handleDetectDisease}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Detecting..." : "Predict"}
              </button>
            </div>

            {/* Display Detection Result */}
            {detectionResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h4 className="text-xl font-semibold text-gray-800">
                  Prediction Result
                </h4>
                <p className="text-gray-700">
                  <strong>Disease:</strong> {detectionResult.prediction}
                </p>
                <p className="text-gray-700">
                  <strong>Confidence:</strong>{" "}
                  {detectionResult.confidence * 100}%
                </p>
                <hr />
                {detectionResult.recommendations && (
                  <div className="mt-2">
                    <strong className="text-green-500">Recommendations:</strong>
                    <ul className="list-disc list-inside text-gray-700">
                      {detectionResult.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
