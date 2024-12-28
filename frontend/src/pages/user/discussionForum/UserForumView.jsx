import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios"; // Import axios for API calls
import UserNav from "../UserNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/user/discussionforum/SideBar";

function UserForumView() {
  const [queries, setQueries] = useState([]); // State for storing queries
  const [search, setSearch] = useState(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch approved queries from the backend when the component is mounted
    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1783/api/query/getapprovedqueries" // Replace with your backend API endpoint
        );
        setQueries(response.data); // Assuming the response contains approved queries
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []); // Run the effect only once when the component is mounted

  // Filter queries based on search input
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
            <h2 className="text-2xl font-semibold">Latest Queries</h2>
            {searchedQueries.length > 0 ? (
              searchedQueries.map((query) => (
                <QueryCard
                  key={query.id}
                  title={query.title}
                  description={query.description}
                  author={query.username}
                  date={query.date}
                  image={`http://localhost:1783/Images/${query.image}`}
                  status={query.status}
                  onClick={() => navigate("/query-detailed-view")}
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

export default UserForumView;
