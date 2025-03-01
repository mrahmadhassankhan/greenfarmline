import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav";
import SideNav from "../../../components/admin/discussionforum/SideNav";
import PendingQueryCard from "../../../components/admin/discussionforum/PendingQueryCard";
import { Axios_Node } from "../../../Axios";
import { toast } from "react-toastify";

function PendingQueries() {
  const [queries, setQueries] = useState([]); // State to hold queries
  const [search, setSearch] = useState(""); // Search state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await Axios_Node.get("/query/getpendingqueries");

        if (response.status === 200) {
          if (response.data.data.length === 0) {
            setError("No pending queries found.");
          } else {
            setQueries(response.data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching queries:", error);

        if (error.response) {
          setError(error.response.data.message || "Server error occurred.");
        } else {
          setError("Network error. Please check your connection.");
        }
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
      await Axios_Node.put("/query/approverejectallqueries", {
        status: "Approved",
      });
      const response = await Axios_Node.get("/query/getpendingqueries");
      setQueries(response.data.data);
      toast.success("All Queries Approved");
    } catch (error) {
      console.error("Error approving queries:", error);
    }
  };

  const handleRejectAll = async () => {
    if (queries.length === 0) {
      toast.error("No pending queries to reject");
      return;
    }

    try {
      await Axios_Node.put("/query/approverejectallqueries", {
        status: "Rejected",
      });
      const response = await Axios_Node.get("/query/getpendingqueries");
      setQueries(response.data.data);
      toast.success("All Queries Rejected");
    } catch (error) {
      console.error("Error rejecting queries:", error);
      toast.error("Failed to reject queries");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="flex">
        <SideNav />
        <main className="w-3/4 max-w-7xl mx-auto p-6">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold">Discussion Forum</h1>
            <div className="join">
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
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : searchedQueries.length > 0 ? (
              searchedQueries.map((query) => (
                <PendingQueryCard
                  key={query._id}
                  title={query.title}
                  description={query.description}
                  author={query.name}
                  date={new Date(query.datePosted).toLocaleDateString()}
                  image={`https://api.greenfarmline.shop/Images/${query.image}`}
                  status={query.status}
                  onApprove={async () => {
                    await Axios_Node.put(
                      `/query/approverejectquery/${query._id}`,
                      {
                        status: "Approved",
                      }
                    );
                    setQueries(
                      queries.map((q) =>
                        q._id === query._id ? { ...q, status: "Approved" } : q
                      )
                    );
                    toast.success("Query approved successfully!");
                  }}
                  onReject={async () => {
                    await Axios_Node.put(
                      `/query/approverejectquery/${query._id}`,
                      {
                        status: "Rejected",
                      }
                    );
                    setQueries(
                      queries.map((q) =>
                        q._id === query._id ? { ...q, status: "Rejected" } : q
                      )
                    );
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
