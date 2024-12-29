import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExpertNav from "../ExpertNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";

function ExpertForumView() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch approved queries from backend
  useEffect(() => {
    axios
      .get("http://localhost:1783/api/query/getapprovedqueries") // Replace with your API endpoint
      .then((response) => {
        setQueries(response.data); // Set fetched queries to state
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching approved queries:", err);
        setError("Failed to load queries. Please try again.");
        setLoading(false);
      });
  }, []);

  // Filter queries based on the search input
  const searchedQueries = queries.filter((query) => {
    const matchesSearch =
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <ExpertNav />
      <div className="max-w-7xl mx-auto p-6 mt-5">
        <div className="flex flex-row justify-between items-center mb-5">
          <h1 className="text-3xl font-bold text-lime-500">Discussion Forum</h1>
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Latest Queries</h2>
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
                author={query.username}
                date={new Date(query.datePosted).toLocaleDateString()}
                image={`http://localhost:1783/Images/${query.image}`}
                status={query.status}
                onClick={() =>
                  navigate("/write-your-answer", { state: { query } })
                }
              />
            ))
          ) : (
            <p className="text-gray-500">
              No queries match your search or filter.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ExpertForumView;
