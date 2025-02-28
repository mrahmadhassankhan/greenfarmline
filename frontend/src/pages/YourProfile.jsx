import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/userService";
import UserNav from "./user/UserNav";
import ExpertNav from "./expert/ExpertNav";
import AdminNav from "./admin/AdminNav";
import Navbar from "../components/Navbar";

const YourProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token); // Call API to fetch user profile
        setProfile(data.user); // Assuming data has a 'user' key
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false); // Stop loading when the request is done
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No user data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Role-based Navigation */}
      {profile.role === "farmer" && <UserNav />}
      {profile.role === "seller" && <></>}
      {profile.role === "expert" && <ExpertNav />}
      {profile.role === "admin" && <AdminNav />}

      {/* Profile Card */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Your Profile
          </h2>

          <div className="space-y-3">
            <p className="text-gray-700">
              <strong>Name:</strong> {profile.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {profile.phoneNumber || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {profile.address || "N/A"}
            </p>

            {/* Seller-Specific Fields */}
            {profile.role === "seller" && (
              <>
                <p className="text-gray-700">
                  <strong>Business Name:</strong> {profile.businessName}
                </p>
                <p className="text-gray-700">
                  <strong>Registration No:</strong> {profile.registrationNo}
                </p>
              </>
            )}

            {/* Expert-Specific Fields */}
            {profile.role === "expert" && (
              <>
                <p className="text-gray-700">
                  <strong>Qualification:</strong> {profile.qualification}
                </p>
                <p className="text-gray-700">
                  <strong>Experience:</strong> {profile.yearsOfExperience} years
                </p>
                <p className="text-gray-700">
                  <strong>Expertise:</strong> {profile.expertise}
                </p>
              </>
            )}
          </div>

          {/* Settings Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => (window.location.href = "/settings")}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
