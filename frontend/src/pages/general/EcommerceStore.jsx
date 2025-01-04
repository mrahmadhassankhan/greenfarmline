import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import StoreBanner from "../../components/general/ecommerceStore/StoreBanner";
import ProductCard from "../../components/general/ecommerceStore/ProductCard";
import ProductDetailView from "../../components/general/ecommerceStore/ProductDetailView";
import Footer from "../../components/Footer";
import image1 from "../../images/ourMissionImage.jpg"
import image2 from "../../images/contactPageImage.jpg"

const dummyProducts = [
    {
        id: 1,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                image: '',
            },
        ],
    },
    {
        id: 2,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                image: '',
            },
        ],
    },
    {
        id: 3,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                image: '',
            },
        ],
    },
    {
        id: 4,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                image: '',
            },
        ],
    },
    {
        id: 5,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                image: '',
            },
        ],
    },
    {
        id: 6,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                images: '',
            },
        ],
    },
    {
        id: 7,
        image: image1,
        title: "High-Quality Wheat Seeds",
        description: "Best wheat seeds for your agricultural needs. High yield guaranteed.",
        price: 1200,
        rating: 4.5,
        category: "Seeds",
        storeName: "Green Farm Store",
        storeLocation: "Lahore, Pakistan",
        deliveryCharges: 200,
        codAvailable: true,
        sellerInfo: "John Doe - Experienced Seller",
        reviews: [
            {
                user: "Ali",
                comment: "Great quality product!",
                image: image2,
            },
            {
                user: "Ayesha",
                comment: "Timely delivery and amazing results.",
                image: '',
            },
        ],
    },
];

const EcommerceStore = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleBackToStore = () => {
        setSelectedProduct(null);
    };

    return (
        <>
            <Navbar />
            {!selectedProduct ? (
                <>
                    <StoreBanner
                        categories={["Seeds", "Machinery", "Pesticides"]}
                        onSearch={() => console.log("Searching...")}
                    />
                    <div className="p-6 bg-gray-100">
                        <h2 className="text-2xl font-semibold text-lime-600 mb-6">Available Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dummyProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onBuyNow={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <ProductDetailView
                    product={selectedProduct}
                    onBack={handleBackToStore}
                />
            )}
            <Footer />
        </>
    );
};

export default EcommerceStore;