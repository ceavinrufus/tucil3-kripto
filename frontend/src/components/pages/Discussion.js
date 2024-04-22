import React, { useState, useEffect } from "react";
import BrowseTopics from "../BrowseTopics";
import ChatRooms from "../ChatRooms";
import { GrClose } from "react-icons/gr";
import CreateRoom from "../CreateRoom";
import axios from "axios";
import SearchUser from "../SearchUser";

const Discussion = () => {
  const [modal, setModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [usedRooms, setUsedRooms] = useState([]);
  const [increment, setIncrement] = useState(1);
  const [type, setType] = useState("All");

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeRoom = (value) => {
    if (value === "All") {
      console.log(rooms);
      setUsedRooms(rooms);
    } else {
      setUsedRooms(rooms.filter((e) => e.topic === value));
    }
    setIncrement(1);
  };

  useEffect(() => {
    axios
      .get(
        (process.env.NODE_ENV === "development"
          ? "http://localhost:4000"
          : process.env.REACT_APP_API_URL) + "/get-rooms"
      )
      .then((res) => {
        // Nanti mau dibikin pagination gitu buat roomnya
        setRooms(res.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setUsedRooms(rooms);
  }, [rooms]);

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
            <CreateRoom />
          </div>
        </div>
      )}
      <div className="bg-[#F58F00] min-h-screen p-10">
        <div className="mb-6 text-white flex gap-2">
          {["All", "Personal", "Group"].map((t) => (
            <button
              onClick={() => setType(t)}
              className={`${
                t === type && "bg-white text-black"
              } rounded-full border px-4 py-2 hover:bg-white hover:text-black transition-all`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row text-[#fff] gap-4 ">
          <div className="flex-1 flex flex-col gap-10">
            {(type === "Personal" || type === "All") && (
              <SearchUser changeRoom={changeRoom} rooms={rooms} />
            )}
            {(type === "Group" || type === "All") && (
              <BrowseTopics changeRoom={changeRoom} rooms={rooms} />
            )}
          </div>
          <ChatRooms
            onClick={toggleModal}
            rooms={usedRooms}
            increment={increment}
            setIncrement={setIncrement}
          />
        </div>
      </div>
    </>
  );
};

export default Discussion;
