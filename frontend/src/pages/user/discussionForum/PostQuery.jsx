import React, { useState } from "react";
import UserNav from "../UserNav";

const PostQuery = () => {
    const [queryData, setQueryData] = useState({
        title: "",
        description: "",
        images: [],
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
            images: files,
        }));
        setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Query Submitted:", queryData);
        // Implement API call to post the query
    };

    return (
        <>
            <UserNav />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                        Post Your Query
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-lime-500 focus:border-lime-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-lime-500 focus:border-lime-500"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                Upload Images (Optional)
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
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
                            className="w-full p-3 text-white bg-lime-500 rounded-lg font-semibold hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                        >
                            Submit Query
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostQuery;