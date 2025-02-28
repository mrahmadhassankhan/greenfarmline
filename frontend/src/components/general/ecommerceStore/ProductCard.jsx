import React from "react";

const ProductCard = ({ product, onBuyNow }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow cursor-pointer">
            {/* Product Image */}
            <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-cover"
            />

            {/* Product Details */}
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500 mt-2">
                    {product.description.length > 50
                        ? `${product.description.slice(0, 50)}...`
                        : product.description}
                </p>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div>
                        <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-md">
                            Rs. {product.price}
                        </span>
                    </div>
                    <div>
                        <p className="text-yellow-500 text-sm mt-1">{product.rating} ⭐</p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex">
                <button
                    onClick={onBuyNow}
                    className="flex-1 bg-green-600 text-white py-2 rounded-bl-md hover:bg-green-700"
                >
                    Buy Now
                </button>
                <button className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-br-md hover:bg-gray-400">
                    <a href="/login">Add to Cart</a>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
