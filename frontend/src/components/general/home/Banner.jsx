import React from "react";
import bannerImage from "../../../images/banner-image.png";

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-12">
        <div className="w-full md:w-1/2 order-2 md:order-1 mt-12 md:mt-32">
          <div className="space-y-12">
            <h1 className="text-4xl font-bold">
              Empowering Farmers, Revolutionizing Agriculture
            </h1>
            <p className="text-l text-justify">
              Green Farm Line brings cutting-edge solutions to the agricultural
              sector, offering a seamless platform for purchasing essentials,
              expert advice, and advanced crop disease detection.{" "}
              <span className="text-green-600 font-bold">
                Grow better, harvest smarter.
              </span>
            </p>
          </div>
          <div className="flex justify-center items-center md:justify-normal">
            <button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">
             <a href="/register">Get Started</a>
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2 mt-12 md:mt-32">
          <img src={bannerImage} alt="banner image here" />
        </div>
      </div>
    </>
  );
}

export default Banner;
