import React, { useState, useEffect } from "react";
import { Axios_Node } from "../../../Axios";
import AdminNav from "../AdminNav";
import SideNav from "../../../components/admin/discussionforum/SideNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";

function ApprovedQueries() {
  const [queries, setQueries] = useState([]); // State for storing queries
  const [search, setSearch] = useState(""); // State for search input
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchApprovedQueries = async () => {
      try {
        const response = await Axios_Node.get("/query/getapprovedqueries");

        if (response.status === 200) {
          if (response.data.data.length === 0) {
            setError(response.data.message);
          } else {
            setQueries(response.data.data);
          }
        }
      } catch (error) {
        console.error(
          "Error fetching approved queries:",
          error.response?.data || error.message
        );
        setError("Failed to load approved queries. Please try again.");
      }
    };

    fetchApprovedQueries();
  }, []);

  // Search filter
  const searchedQueries = queries.filter((query) => {
    const matchesSearch =
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

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
            <h2 className="text-2xl font-semibold">Approved Queries</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : searchedQueries.length > 0 ? (
              searchedQueries.map((query) => (
                <QueryCard
                  key={query.id}
                  title={query.title}
                  description={query.description}
                  author={query.name}
                  date={new Date(query.datePosted).toLocaleDateString()}
                  image={`https://api.greenfarmline.shop/Images/${query.image}`}
                  status={query.status}
                />
              ))
            ) : (
              <p className="text-gray-500">No queries match your search.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default ApprovedQueries;
