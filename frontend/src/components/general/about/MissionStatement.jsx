import React from "react";
import OurMissionImage from "../../../images/ourMissionImage.jpg";
const MissionStatement = () => {
  return (
    <div className="  max-w-screen-2xl bg-gray-200 dark:bg-slate-900 dark:border-t py-10 container mx-auto md:px-20 px-4 flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold  text-black dark:text-gray-500 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-lg  text-black dark:text-gray-300 text-center max-w-3xl mx-auto">
          At Green Farm Line, our mission is to revolutionize agriculture by
          providing cutting-edge technology solutions for farmers and sellers to
          maximize productivity and efficiency.
        </p>
      </div>
      <div className="w-full md:w-1/2 order-1 md:order-2">
        <img className="rounded-2xl" src={OurMissionImage} alt="image here" />
      </div>
    </div>
  );
};

export default MissionStatement;
