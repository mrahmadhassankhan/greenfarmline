import React, { useState } from "react";
import UserNav from "../UserNav";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/user/discussionforum/SideBar";
import { toast } from "react-toastify";
import { Axios_Node } from "../../../Axios";

const PostQuery = () => {
  const [queryData, setQueryData] = useState({
    title: "",
    description: "",
    queryImage: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setQueryData((prev) => ({
      ...prev,
      queryImage: files,
    }));
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send images along with other data
    const formData = new FormData();
    formData.append("title", queryData.title);
    formData.append("description", queryData.description);
    formData.append("role", JSON.parse(localStorage.getItem("user")).role);
    formData.append("email", JSON.parse(localStorage.getItem("user")).email);
    formData.append("name", JSON.parse(localStorage.getItem("user")).name);

    // Append images if they exist
    queryData.queryImage.forEach((file) => {
      formData.append("document", file);
    });

    // Log FormData entries
    formData.forEach((value, key) => {});
    try {
      // Send the POST request
      const response = await Axios_Node.post("/query/postquery", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      // Handle the response after successfully submitting the query
      toast.success("Query Submitted Successfully");
      navigate("/your-queries");
    } catch (error) {
      // Handle errors here
      console.error("Error submitting the query:", error);
      toast.error("Failed to Submit Query");
      alert("Failed to submit query");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <UserNav />
      <div className="flex">
        {/* Side Panel */}
        <SideBar />

        {/* Main Content */}
        <main className="w-3/4 max-w-7xl mx-auto p-6">
          <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                Post Your Query
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Query Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={queryData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter the title of your query"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={queryData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your query in detail"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label
                    htmlFor="images"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Images (Optional)
                  </label>
                  <input
                    type="file"
                    id="images"
                    name="document"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                  />
                  {/* Image Preview */}
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg shadow"
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-3 text-white bg-green-600 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                >
                  Submit Query
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PostQuery;
