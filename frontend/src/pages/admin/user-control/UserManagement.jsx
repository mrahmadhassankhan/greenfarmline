import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import { Axios_Node } from "../../../Axios";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Axios_Node.get("/admin/users");
      setUsers(response.data.users.filter((user) => user.role !== "admin"));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await Axios_Node.delete(`/admin/user/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            User Management
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Registered Users
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left">#</th>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Role</th>
                  <th className="border p-3 text-left">Registered Date</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="border p-3">{index + 1}</td>
                      <td className="border p-3">{user.name}</td>
                      <td className="border p-3">{user.email}</td>
                      <td className="border p-3 capitalize">{user.role}</td>
                      <td className="border p-3">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="border p-3 text-center">
                        <button
                          onClick={() => removeUser(user._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border p-3 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManagement;
