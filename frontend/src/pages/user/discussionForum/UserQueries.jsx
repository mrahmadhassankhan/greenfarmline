import React, { useState, useEffect } from "react";
import UserNav from "../UserNav";
import QueryCard from "../../../components/general/discussionForum/QueryCard";
import SideBar from "../../../components/user/discussionforum/SideBar";
import { Axios_Node } from "../../../Axios";

function UserQueries() {
  const [queries, setQueries] = useState([]); // State to store fetched queries
  const [filter, setFilter] = useState("All"); // Filter state
  const [search, setSearch] = useState(""); // Search state

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("user")).email;

    const res = Axios_Node.get(`/query/getuserquery?email=${email}`)
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setQueries(res.data.data);
        } else {
          setQueries([]);
        }
      })
      .catch((err) => {});
  }, []);

  // Filter and search logic
  const filteredQueries = queries.filter((query) => {
    const matchesFilter =
      filter === "All" || query.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      query.title.toLowerCase().includes(search.toLowerCase()) ||
      query.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
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
              {/* Filter Dropdown */}
              <select
                className="select select-bordered join-item"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-semibold">Your Queries</h2>
            {filteredQueries.length > 0 ? (
              filteredQueries.map((query) => (
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

export default UserQueries;
