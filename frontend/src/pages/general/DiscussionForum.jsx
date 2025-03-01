import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios_Node } from "../../Axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QueryCard from "../../components/general/discussionForum/QueryCard";

function DiscussionForum() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get user data from localStorage
  const isUser = () => {
    const user = localStorage.getItem("user");
    return user ? true : false;
  };

  // Fetch approved queries from backend
  useEffect(() => {
    Axios_Node.get("/query/getapprovedqueries")
      .then((response) => {
        setQueries(response.data.data); // Set the fetched queries to state
        setLoading(false); // Stop the loading spinner
      })
      .catch((error) => {
        console.error("Error fetching approved queries:", error);
        setError("Failed to load approved queries. Please try again.");
        setLoading(false);
      });
  }, []);

  // Handle query click
  const handleQueryClick = (query) => {
    if (isUser) {
      // If user is not logged in, redirect to login
      navigate("/login");
    } else if (
      JSON.parse(localStorage.getItem("user")).role !== "farmer" ||
      JSON.parse(localStorage.getItem("user")).role !== "expert"
    ) {
      // If user role is not "farmer", show a toast or message
      alert("You are not allowed to access this page.");
    } else {
      // If user is a logged-in farmer, redirect to the query details page
      navigate("/query-detailed-view", { state: { query } });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 mt-16 h-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Discussion Forum
        </h1>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Latest Queries</h2>
          {loading ? (
            <p className="text-gray-500">Loading queries...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : Array.isArray(queries) && queries.length > 0 ? (
            queries.map((query) => (
              <QueryCard
                key={query._id}
                title={query.title}
                description={query.description}
                author={query.name}
                date={new Date(query.datePosted).toLocaleDateString()}
                image={`https://api.greenfarmline.shop/Images/${query.image}`}
                status={query.status}
                onClick={() => handleQueryClick(query)}
              />
            ))
          ) : (
            <p className="text-gray-500">No approved queries available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DiscussionForum;
