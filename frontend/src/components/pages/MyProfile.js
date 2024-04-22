import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (location.state) {
      // console.log(location.state);
      axios
        .get(
          (process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : process.env.REACT_APP_API_URL) +
            `/get-user/?username=${location.state.username}`
        )
        .then((res) => {
          // console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [location.state]);

  return (
    <>
      <div className="bg-[#F58F00] min-h-screen py-8 px-12 flex flex-col items-center">
        <div className="grid grid-row justify-center gap-1">
          {/*Pura-pura aja dulu ini dpnya*/}
          <div className="flex justify-center">
            <CgProfile size={150} color={"#000"} />
          </div>
          <p className="text-center text-3xl font-bold">{user && user.name}</p>
          <p className="text-center text-xl text-[#5E39C4]">
            @{user && user.username}
          </p>
          <div className="flex flex-col justify-center space-y-2 my-4">
            <Link
              to="/editprofile"
              className="px-4 py-2 bg-[#5E39C4] text-center text-[#ffffff] hover:bg-[#9881DA] rounded-3xl"
            >
              <button>Edit Profile</button>
            </Link>
            <Link
              to="/discussion"
              className="px-4 py-2 border bg-white text-center text-[#000] hover:bg-transparent rounded-3xl"
            >
              <button>Back to Discussion</button>
            </Link>
          </div>
        </div>
        <div className="w-full xl:w-1/2 md:w-2/3">
          <div className="flex flex-col text-left">
            <p className="text-[#ffffff] text-xl font-bold mt-5"> ABOUT </p>
            {/* <div className="rounded-xl mb-5 bg-white px-4 py-2 flex items-center"> */}
            {user &&
              (user.bio === "" ? (
                <p className="italic mb-5 text-[#fff]">No bio</p>
              ) : (
                <p className="mb-5 text-[#ffffff]">{user.bio}</p>
              ))}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
