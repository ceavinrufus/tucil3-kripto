import React, { useState, useEffect } from "react";
import BrowseTopics from "../BrowseTopics";
import ChatRooms from "../ChatRooms";
import axios from "axios";
import SearchUser from "../SearchUser";

const Discussion = () => {
  const [rooms, setRooms] = useState([]);
  const [usedRooms, setUsedRooms] = useState([]);
  const [increment, setIncrement] = useState(1);
  const [type, setType] = useState("All");

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
      <div className="bg-[#F58F00] min-h-screen p-10">
        {/* <div className="mb-6 text-white flex gap-2">
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
        </div> */}
        <div className="flex flex-col md:flex-row text-[#fff] gap-4 ">
          <div className="flex-1 flex flex-col gap-10">
            {(type === "Personal" || type === "All") && (
              <SearchUser changeRoom={changeRoom} rooms={rooms} />
            )}
            <BrowseTopics changeRoom={changeRoom} rooms={rooms} />
          </div>
          <ChatRooms
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
