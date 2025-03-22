import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios_Node } from "../../../Axios";
import ExpertNav from "../ExpertNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";

function ExpertForumView() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios_Node.get("/query/getapprovedqueries")
      .then((response) => {
        setQueries(Array.isArray(response.data.data) ? response.data.data : []); // Ensure it's an array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching approved queries:", err);
        setError("Failed to load queries. Please try again.");
        setLoading(false);
      });
  }, []);

  const searchedQueries = Array.isArray(queries)
    ? queries.filter((query) => {
        const matchesSearch =
          query.title.toLowerCase().includes(search.toLowerCase()) ||
          query.description.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
      })
    : [];

  return (
    <>
      <ExpertNav />
      <div className="max-w-7xl mx-auto p-6 mt-5 min-h-screen">
        <div className="flex flex-row justify-between items-center mb-5">
          <h1 className="text-3xl font-bold text-green-600">
            Discussion Forum
          </h1>
          <div className="join">
            {/* Search Input */}
            <input
              type="text"
              className="input input-bordered join-item hidden lg:flex"
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
                key={query._id}
                title={query.title}
                description={query.description}
                author={query.name}
                date={new Date(query.datePosted).toLocaleDateString()}
                image={`https://api.greenfarmline.shop/Images/${query.image}`}
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
