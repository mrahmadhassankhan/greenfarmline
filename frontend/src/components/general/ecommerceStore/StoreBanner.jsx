import React from "react";
import BannerImage from "../../../images/store-banner.jpg";

const StoreBanner = ({ onSearch, categories }) => {
  return (
    <div className="relative bg-gray-100 w-full mt-16">
      {/* Full-width banner image */}
      <div className="relative">
        <img
          src={BannerImage}
          alt="Banner"
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Welcome to Green Farm Line Store
          </h1>
        </div>
      </div>

      {/* Below the banner */}
      <div className="mt-6 p-6 flex flex-col md:flex-row gap-6">
        {/* Categories List */}
        <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Categories
          </h2>
          <ul className="space-y-3">
            {categories.map((category, index) => (
              <li key={index} className="cursor-pointer hover:text-green-600">
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Search Box */}
        <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Search for Products
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-600"
            />
            <select className="border border-gray-300 rounded-md p-2 bg-white">
              <option>All Categories</option>
              <option>Seeds</option>
              <option>Machinery</option>
              <option>Pesticides</option>
            </select>
            <button
              onClick={onSearch}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBanner;
