import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] flex flex-col md:flex-row  justify-between px-6 md:px-16 py-15 bg-white">
      {/* Left Side Text */}
      <div className="max-w-[45%] text-center md:text-left space-y-4 ">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-2 mb-6 ">
          Lost Something On Campus?
          <span className="text-black mt-8">Let’s Help You Find It</span>
        </h1>
        <p className="text-gray-700 text-base md:text-lg mt-8">
          Searched every corner of campus? Don’t stress!
          <br />
          Post, search, or report lost and found items in minutes.
          <br />
          Reconnect with what matters.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 mt-12">
          <button
            onClick={() => navigate("/report")}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition ">
            Report an Item
          </button>
          <button
            onClick={() => navigate("/browse")}
            className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition ml-5">
            Browse Lost Items
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className=" md:w-[55%] flex justify-center mb-8 md:mb-0">
        <img
          src="https://i.pinimg.com/originals/4b/79/52/4b795221dbe1fa053ab1007b08e3f947.gif"
          alt="Person searching"
          className=" w-full size-fit"
        />
      </div>
    </div>
  );
};

export default HeroSection;
