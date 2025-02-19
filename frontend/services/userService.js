import axios from "axios";

// Get user profile
export const getUserProfile = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get("http://localhost:1783/api/v1/profile", config);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };
  const response = await axios.put("http://localhost:1783/api/v1/profile/update", userData, config);
  return response.data;
};
