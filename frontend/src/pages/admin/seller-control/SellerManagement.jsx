import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import { Axios_Node } from "../../../Axios";

function SellerManagement() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await Axios_Node.get("/admin/users");
      const sellerList = response.data.users.filter(
        (user) => user.role === "seller"
      );
      setSellers(sellerList);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  const removeSeller = async (id) => {
    if (!window.confirm("Are you sure you want to remove this seller?")) return;
    try {
      await Axios_Node.delete(`/admin/user/${id}`);
      setSellers(sellers.filter((seller) => seller._id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error removing seller:", error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Seller Management
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Active Sellers
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left">#</th>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Registered Date</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.length > 0 ? (
                  sellers.map((seller, index) => (
                    <tr key={seller._id} className="hover:bg-gray-100">
                      <td className="border p-3">{index + 1}</td>
                      <td className="border p-3">{seller.name}</td>
                      <td className="border p-3">{seller.email}</td>
                      <td className="border p-3">{seller.createdAt}</td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => removeSeller(seller._id)}
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
                      colSpan="5"
                      className="border p-3 text-center text-gray-500"
                    >
                      No sellers found
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

export default SellerManagement;
