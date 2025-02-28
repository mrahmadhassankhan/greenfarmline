import React from "react";
import storeImage from "../../../images/ecommerce-store.jpg";
import forumImage from "../../../images/discussion-forum.jpg";
import detectorImage from "../../../images/detector.jpg";

function Services() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col my-12">
        <div className="w-full flex-col">
          <div className="text-4xl font-bold text-center">Our Services</div>
          <div className="w-full mt-12 flex flex-col items-center md:flex-row gap-2">
            <div className="card bg-base-900 dark:bg-slate-900 dark:border w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={storeImage}
                  alt="ecommerce store"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Ecommerce Store</h2>
                <p>Here you can buy the things you need.</p>
                <div className="card-actions">
                  <button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">
                    <a href="/ecommerce-store">Explore</a>
                  </button>
                </div>
              </div>
            </div>
            <div className="card bg-base-900 dark:bg-slate-900 dark:border w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={forumImage}
                  alt="discussion forum"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Discussion Forum</h2>
                <p>Post you issues and get adivce from field experts.</p>
                <div className="card-actions">
                  <button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">
                    <a href="/discussionforum">Explore</a>
                  </button>
                </div>
              </div>
            </div>
            <div className="card bg-base-900 dark:bg-slate-900 dark:border w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={detectorImage}
                  alt="detector"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Detector</h2>
                <p>
                  Upload you crop image and get results for crop disease
                  detection.
                </p>
                <div className="card-actions">
                  <button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">
                    <a href="/image-detection">Explore</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
