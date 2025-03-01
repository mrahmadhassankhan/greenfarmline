import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpertNav from "../ExpertNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";
import { Axios_Node } from "../../../Axios";

function ExpertAnsweredQueries() {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const navigate = useNavigate();
  const expertEmail = JSON.parse(localStorage.getItem("user")).email; // You can replace this with a dynamic value

  useEffect(() => {
    // Fetch the queries answered by the expert
    Axios_Node.get(`/answer/expert/${expertEmail}`)
      .then((response) => {
        // Filter the queries where the expert has provided an answer
        const expertAnsweredQueries = response.data.filter((query) =>
          query.answers.some((answer) => answer.email === expertEmail)
        );
        setQueries(expertAnsweredQueries);
      })
      .catch((error) => {
        console.error("Error fetching queries:", error);
      });
  }, [expertEmail]);

  // Filter queries based on search input
  const searchedQueries = queries.filter((query) => {
    const matchesSearch =
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

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
          <h2 className="text-xl font-semibold">Previously Answered Queries</h2>
          {searchedQueries.length > 0 ? (
            searchedQueries.map((query) => (
              <QueryCard
                key={query._id} // Use _id as the key
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

export default ExpertAnsweredQueries;
