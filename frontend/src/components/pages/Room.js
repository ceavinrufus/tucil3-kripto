import React, { useEffect, useState, useRef } from "react";
import BubbleChat from "../BubbleChat";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import io from "socket.io-client";
import ChatForm from "../ChatForm";

const socket = io.connect(
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://chat-rsa.vercel.app"
);

const Room = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState({});
  const [pesans, setPesans] = useState([]);
  const messagesEndRef = useRef(null);

  // const bubbles = messages.filter(function (el) {
  //   return el.roomId === parseInt(roomId);
  // });

  useEffect(() => {
    setRoom(location.state);
  }, [location.state]);

  useEffect(() => {
    if (room.users) {
      setIsJoined(room.users.includes(user.username));
    }
    if (room.users) {
      socket.emit("join-room", room._id);
      axios
        .get(process.env.REACT_APP_API_URL + `/get-pesan/?room=${room._id}`)
        .then((res) => setPesans(res.data))
        .catch((err) => console.log(err));
    }
  }, [room, user?.username]);

  socket.on("receive-message", (data) => {
    if (!pesans.includes(data)) {
      setPesans([...pesans, data]);
    }
  });

  const handleJoin = (e) => {
    e.preventDefault();

    if (user) {
      axios
        .post(process.env.REACT_APP_API_URL + "/update-room", {
          _id: room._id,
          users: [...room.users, user.username],
        })
        .then((res) => {
          setRoom(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLeave = (e) => {
    e.preventDefault();

    if (user) {
      axios
        .post(process.env.REACT_APP_API_URL + "/update-room", {
          _id: room._id,
          users: room.users.filter((username) => username !== user.username),
        })
        .then((res) => {
          setRoom(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteRoom = (e) => {
    e.preventDefault();

    if (user && room) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/delete-room", {
          data: { _id: room._id },
        })
        .then((res) => {
          if (res.status === 200) {
            setRoom(null);
            navigate("/discussion");
          } else {
            // Handle unexpected response status
            console.error("Unexpected status:", res.status);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleClass = () => {
    document.querySelector(".participant").classList.toggle("h-0");
    document.querySelector(".participant").classList.toggle("p-2");
  };

  return (
    <div className="bg-[#F58F00] min-h-screen py-4 px-12">
      {/* Room Header */}
      <div className="flex items-center justify-between my-5 text-[#fff] ">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{room.name && room.name}</h1>
          <h1 className="text-xl">{room.description && room.description}</h1>
        </div>

        <div className="flex gap-2">
          {room.users ? (
            room.users[0] === user.username && (
              <button
                onClick={handleDeleteRoom}
                className="flex items-center gap-2 rounded-lg px-4 py-2 bg-[#ee1818] hover:bg-[#e45c5c] disabled:cursor-not-allowed"
              >
                Delete Room
              </button>
            )
          ) : (
            <></>
          )}
          <button
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${"bg-[#5E39C4] hover:bg-[#9881DA]"} disabled:cursor-not-allowed`}
            onClick={isJoined ? handleLeave : handleJoin}
          >
            {isJoined ? "Leave" : "Join Room"}
          </button>
        </div>
      </div>

      {/* Host */}
      <div className="flex items-center text-[#fff] mb-2">
        <p>
          HOST:{" "}
          {room.users && (
            <Link to={"/profile/" + room.users[0]} className="text-[#44288F]">
              @{room.users[0]}
            </Link>
          )}
        </p>
      </div>

      <div className="flex flex-col order-2 md:order-first md:flex-row gap-8 text-[#fff]">
        {/* Chat */}
        <div className="flex-grow bg-[#fff] rounded-xl text-[#000] h-[600px] md:w-1/2">
          <div className="p-4 md:p-8 flex flex-col justify-between h-[100%] gap-4 divide-y-2">
            <div className="space-y-1 md:space-y-2 overflow-y-auto ">
              {pesans.map((bubble, id) => (
                <BubbleChat key={id} bubble={bubble} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <ChatForm room={room} isJoined={isJoined} socket={socket} />
          </div>
        </div>

        {/* Participants */}
        <div className="flex-1 order-first md:order-2 divide-y-2 h-3/5">
          <div className="bg-[#FFCC85] px-4 py-2 text-[#000] rounded-t-md">
            <div className="flex">
              <h1
                className="text-white md:text-black md:mx-left mx-auto md:cursor-default cursor-pointer"
                onClick={() => toggleClass()}
              >
                PARTICIPANTS
              </h1>
            </div>
          </div>
          <div className="bg-[#fff] participant h-0 md:h-max md:p-2 overflow-hidden rounded-b-md space-y-2">
            {room.users &&
              room.users.map((username, id) => (
                // <Link to={"/profile/" + username} className="text-[#5E39C4] ">
                <div key={id} className="flex items-center gap-2 px-2 py-2">
                  <CgProfile size={30} color={"#000"} />
                  <Link
                    to={"/profile/" + username}
                    style={{ color: "#44288F" }}
                  >
                    @{username}
                  </Link>
                </div>
                // </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
