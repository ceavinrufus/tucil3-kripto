import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import CreateRoom from "../CreateRoom";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (username) {
      // console.log(username);
      axios
        .get(
          (process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : process.env.REACT_APP_API_URL) + `/get-user/?username=${username}`
        )
        .then((res) => {
          // console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [username]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <div className="fixed min-h-screen w-screen">
          <div
            className="fixed w-full h-full p-0 bg-black/[0.6]"
            onClick={toggleModal}
          ></div>
          <div className="fixed top-1/2 left-1/2 z-50 bg-[#fff] rounded-xl w-[350px] sm:w-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="bg-[#FFCC85] p-5 rounded-t-xl text-xl">
              <h1 className="flex items-center justify-between font-bold">
                Create Room{" "}
                <button onClick={toggleModal}>
                  <GrClose />
                </button>
              </h1>
            </div>
            <CreateRoom withUsername={username} />
          </div>
        </div>
      )}
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
            <button
              onClick={toggleModal}
              className="rounded-full px-4 py-2 bg-[#5E39C4] hover:bg-[#9881DA] text-[#fff] transition duration-200"
            >
              Start a Chat
            </button>
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

export default Profile;
