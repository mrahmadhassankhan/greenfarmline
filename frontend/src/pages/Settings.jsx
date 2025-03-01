import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../services/userService";
import UserNav from "./user/UserNav";
import ExpertNav from "./expert/ExpertNav";
import AdminNav from "./admin/AdminNav";

const Settings = () => {
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");
  const userRole = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setFormData(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData, token);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Role-based Navigation */}
      {userRole === "farmer" && <UserNav />}
      {userRole === "seller" && <></>}
      {userRole === "expert" && <ExpertNav />}
      {userRole === "admin" && <AdminNav />}

      {/* Form Container */}
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Update Your Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Common Fields */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Seller-Specific Fields */}
          {userRole === "seller" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Registration No
                </label>
                <input
                  type="text"
                  name="registrationNo"
                  value={formData.registrationNo || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          )}

          {/* Expert-Specific Fields */}
          {userRole === "expert" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
