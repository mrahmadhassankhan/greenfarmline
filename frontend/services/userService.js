import { Axios_Node } from "../src/Axios";

// Get user profile
export const getUserProfile = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await Axios_Node.get("/users/profile", config);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await Axios_Node.put(
    "/users/profile/update",
    userData,
    config
  );
  return response.data;
};
