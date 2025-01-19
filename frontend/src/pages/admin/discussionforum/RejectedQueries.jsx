import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../AdminNav";
import SideNav from "../../../components/admin/discussionforum/SideNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";

function RejectedQueries() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch rejected queries using Axios
  useEffect(() => {
    const fetchRejectedQueries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1783/api/query/getrejectedqueries"
        );
        setQueries(response.data); // Assuming the response contains an array of queries
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch rejected queries. Please try again later.");
        setLoading(false);
      }
    };

    fetchRejectedQueries();
  }, []);

  // Filter queries based on search input
  const searchedQueries = queries.filter(
    (query) =>
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase())
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
                placeholder="Search"
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
                  key={query.id}
                  title={query.title}
                  description={query.description}
                  author={query.name}
                  date={new Date(query.datePosted).toLocaleDateString()}
                  image={`http://localhost:1783/Images/${query.image}`}
                  status={query.status}
                  onClick={() => console.log("Query Clicked..")}
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

export default RejectedQueries;
