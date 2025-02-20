import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav";
import SideNav from "../../../components/admin/discussionforum/SideNav";
import PendingQueryCard from "../../../components/admin/discussionforum/PendingQueryCard";
import axios from "axios";
import { toast } from "react-toastify";

function PendingQueries() {
  const [queries, setQueries] = useState([]); // State to hold queries
  const [search, setSearch] = useState(""); // Search state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch only pending queries from the backend when the component is mounted
    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1783/api/query/getpendingqueries" // Ensure this hits the updated API
        );
        setQueries(response.data); // Assuming the response contains only pending queries
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };
    fetchQueries();
  }, []);

  const searchedQueries = queries.filter((query) => {
    const matchesSearch =
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleApproveAll = async () => {
    try {
      await axios.put(
        "http://localhost:1783/api/query/approverejectallqueries",
        { status: "Approved" }
      );
      const response = await axios.get(
        "http://localhost:1783/api/query/getpendingqueries"
      );
      setQueries(response.data);
      toast.success("All Queries Approved");
    } catch (error) {
      console.error("Error approving queries:", error);
    }
  };

  const handleRejectAll = async () => {
    try {
      await axios.put(
        "http://localhost:1783/api/query/approverejectallqueries",
        { status: "Rejected" }
      );
      // After successfully updating, refetch the queries to exclude the rejected ones
      const response = await axios.get(
        "http://localhost:1783/api/query/getpendingqueries"
      );
      setQueries(response.data);
      toast.success("All Queries Rejected");
    } catch (error) {
      console.error("Error rejecting queries:", error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="flex">
        {/* Side Panel */}
        <SideNav />
        {/* Main Content */}
        <main className="w-3/4 max-w-7xl mx-auto p-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold">Discussion Forum</h1>
            <div className="join">
              {/* Search Input */}
              <input
                type="text"
                className="input input-bordered join-item"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Pending Queries</h2>
              <div>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mx-2"
                  onClick={handleApproveAll}
                >
                  Approve All
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
              </div>
            </div>
            {searchedQueries.length > 0 ? (
              searchedQueries.map((query) => (
                <PendingQueryCard
                  key={query._id} // Use MongoDB _id
                  title={query.title}
                  description={query.description}
                  author={query.name}
                  date={new Date(query.datePosted).toLocaleDateString()} // Format date
                  image={`http://localhost:1783/Images/${query.image}`}
                  status={query.status}
                  onClick={console.log(`Navigating to query ID: ${query._id}`)}
                  // onClick={() =>
                  //   navigate("/admin-query-detailed-view", {
                  //     state: { queryId: query._id },
                  //   })
                  // } // Pass query ID to detailed view
                  onApprove={async () => {
                    await axios.put(
                      `http://localhost:1783/api/query/approverejectquery/${query._id}`,
                      {
                        status: "Approved",
                      }
                    );
                    // Update the query status after approval
                    const updatedQueries = queries.map((q) =>
                      q._id === query._id ? { ...q, status: "Approved" } : q
                    );
                    setQueries(updatedQueries);
                    toast.success("Query approved successfully!");
                  }}
                  onReject={async () => {
                    await axios.put(
                      `http://localhost:1783/api/query/approverejectquery/${query._id}`,
                      {
                        status: "Rejected",
                      }
                    );
                    // Update the query status after rejection
                    const updatedQueries = queries.map((q) =>
                      q._id === query._id ? { ...q, status: "Rejected" } : q
                    );
                    setQueries(updatedQueries);
                    toast.success("Query rejected successfully!");
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500">
                No queries match your search or filter.
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default PendingQueries;
