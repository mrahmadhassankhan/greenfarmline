import React from "react";

const ProductDetailView = ({ product, onBack }) => {
    return (
        <div className="p-6 bg-gray-100 mt-16">
            <button
                onClick={onBack}
                className="mb-4 text-green-700 hover:underline"
            >
                &larr; Back to Store
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Product Images Carousel */}
                <div className="col-span-1">
                    <div className="space-y-4">
                            <img
                                src={product.image}
                                alt={`${product.title}`}
                                className="w-full rounded-lg shadow-lg"
                            />
                    </div>
                </div>

                {/* Center Details Section */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold text-green-700">{product.title}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <div className="mt-4">
                        <p className="text-xl text-green-600 font-bold">Rs. {product.price}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Category: {product.category}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Store: {product.storeName}
                        </p>
                        <p className="text-yellow-500 text-sm mt-1">
                            Rating: {product.rating} ⭐
                        </p>
                    </div>
                    <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        <a href="/login">Proceed to Checkout</a>
                    </button>
                </div>

                {/* Delivery and Seller Info */}
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-700">Delivery Details</h3>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                        <li>Store Location: {product.storeLocation}</li>
                        <li>Standard Delivery: Rs. {product.deliveryCharges}</li>
                        <li>Cash on Delivery: {product.codAvailable ? "Available" : "Not Available"}</li>
                        <li>Return Policy: 14 days return</li>
                        <li>Warranty: Not Available</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-green-700 mt-6">Seller Information</h3>
                    <p className="text-sm text-gray-600 mt-2">{product.sellerInfo}</p>
                </div>
            </div>

            {/* User Reviews */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-green-700">User Reviews</h3>
                <div className="mt-4 space-y-4">
                    {product.reviews.map((review, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white shadow rounded-lg flex flex-row items-center justify-between"
                        >
                            {/* Review Content */}
                            <div className="w-2/3">
                                <p className="text-gray-700">{review.comment}</p>
                                <p className="text-sm text-gray-500 mt-2">- {review.user}</p>
                            </div>

                            {/* Review Images */}
                            {review.image && (
                                <div className="flex flex-wrap gap-2 w-1/3 justify-end">
                                        <img
                                            src={review.image}
                                            alt={`Review by ${review.user}`}
                                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                                        />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductDetailView;
