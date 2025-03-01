import React from "react";

const features = [
    { title: "E-commerce", description: "Access a vast marketplace for agricultural products.", icon: "🛒", link: "/ecommerce-store"},
    { title: "Forum", description: "Engage in discussions with experts and fellow farmers.", icon: "💬", link: "/discussionforum" },
    { title: "Crop Detection", description: "Use AI to detect crop diseases through image uploads.", icon: "🌱", link: "/image-detection" },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 dark:border-t">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-500 mb-10">
          What We Offer
        </h2>
        <div className="flex justify-around flex-col lg:gap-5 lg:flex-row">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white text-black card  dark:bg-slate-900 dark:text-white border w-full lg:w-96 drop-shadow-2xl p-10 mb-6"
            >
              <div className="text-5xl">{feature.icon}</div>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{feature.title}</h2>
                <p>{feature.description}</p>
                <div className="card-actions">
                  <button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">
                    <a href={feature.link}>Explore</a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
