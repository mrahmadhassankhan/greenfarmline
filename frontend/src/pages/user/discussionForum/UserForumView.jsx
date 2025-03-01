import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios_Node } from "../../../Axios";
import QueryCard from "../../../components/general/discussionForum/QueryCard";
import UserNav from "../UserNav";
import SideBar from "../../../components/user/discussionforum/SideBar";

function UserForumView() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    Axios_Node.get("/query/getapprovedqueries")
      .then((response) => {
        if (response.data.data.length > 0) {
          setQueries(response.data.data);
          setError("");
        } else {
          setError("No latest queries available");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching queries");
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  // Filter queries based on the search input
  const searchedQueries = queries.filter((query) => {
    const matchesSearch =
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <UserNav />
      <div className="flex">
        {/* Side Panel */}
        <SideBar />

        <main className="w-3/4 max-w-7xl mx-auto p-6">
          <div className="max-w-7xl mx-auto p-6 mt-5">
            <div className="flex flex-row justify-between items-center mb-5">
              <h1 className="text-3xl font-bold text-green-600">
                Discussion Forum
              </h1>
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
                <p className="text-gray-500"> {error}</p>
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
                    onClick={() =>
                      navigate("/query-detailed-view", { state: { query } })
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
        </main>
      </div>
    </>
  );
}

export default UserForumView;
