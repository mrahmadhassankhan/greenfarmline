import React, { useState, useEffect } from "react";
import { Axios_Node } from "../../../Axios";
import AdminNav from "../AdminNav";
import SideNav from "../../../components/admin/discussionforum/SideNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";

function RejectedQueries() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRejectedQueries = async () => {
      try {
        setLoading(true);
        const response = await Axios_Node.get("/query/getrejectedqueries");

        if (response.data && response.data.data) {
          setQueries(response.data.data);
        } else {
          setQueries([]);
          setError("No rejected queries found.");
        }
      } catch (err) {
        setError("Failed to fetch rejected queries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedQueries();
  }, []);

  // Filter queries based on search input
  const searchedQueries = queries.filter((query) =>
    `${query.title} ${query.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
                placeholder="Search queries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-semibold">Rejected Queries</h2>
            {loading ? (
              <p className="text-gray-500">Loading queries...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : searchedQueries.length > 0 ? (
              searchedQueries.map((query) => (
                <QueryCard
                  key={query.id || query._id} // Ensuring a unique key
                  title={query.title}
                  description={query.description}
                  author={query.name}
                  date={
                    query.datePosted
                      ? new Date(query.datePosted).toLocaleDateString()
                      : "Unknown Date"
                  }
                  image={
                    query.image
                      ? `https://api.greenfarmline.shop/Images/${query.image}`
                      : ""
                  }
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

export default RejectedQueries;
