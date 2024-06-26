import React from "react";
import { Link } from "react-router-dom";
import homeimg from "../../assets/home.png";

const LandingPage = () => {
  return (
    <div className="h-screen -translate-y-[8]">
      <div className="flex md:flex-row flex-col justify-center items-center z-20 h-screen">
        <div className="">
          <img src={homeimg} alt="wave" className="w-60 md:w-96" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl mb-4 text-[#F58F00]">
            Chat<span className="font-bold">RSA</span>
          </h1>
          <div className="flex flex-col gap-2 justify-center w-full">
            <Link to="/discussion" className="w-full">
              <button className="w-full rounded-full px-4 py-2 bg-[#5E39C4] hover:bg-[#9881DA] text-[#fff] text-xl transition duration-200">
                Online Chat
              </button>
            </Link>
            <Link to="/simulator" className="w-full">
              <button className="w-full rounded-full px-4 py-2 bg-[#5E39C4] hover:bg-[#9881DA] text-[#fff] text-xl transition duration-200">
                Offline Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
