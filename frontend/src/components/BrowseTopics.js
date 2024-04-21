import React, { useEffect, useState } from "react";
import axios from "axios";

const BrowseTopics = ({ changeRoom, rooms }) => {
  const [topics, setTopics] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/get-topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onChangeRoom = (value) => {
    changeRoom(value);
    setActive(value);
  };

  const toggleClass = () => {
    document.querySelector(".browseTopic").classList.toggle("h-0");
    document.querySelector(".browseTopic").classList.toggle("p-2");
  };

  return (
    <div className="flex-1 divide-y-2 min-w-[200px]">
      <div className="flex mb-2 font-bold">
        <h1
          className="mx-auto md:mx-0 hover:cursor-pointer md:hover:cursor-default"
          onClick={() => toggleClass()}
        >
          BROWSE TOPICS
        </h1>
      </div>
      <div className="space-y-2">
        <div className="browseTopic h-0 md:h-max md:p-2 transition overflow-hidden">
          <div
            className="flex flex-col bg-[#fff] hover:bg-[#FFCC85] px-4 py-2 shadow-md rounded-xl mt-4 transition duration-200 cursor-pointer"
            onClick={(e) => onChangeRoom("All")}
          >
            <div className="flex items-center">
              <div className="w-full flex-wrap text-[#000]">All</div>
              <div className="bg-[#F58F00] rounded-full w-8 h-8 flex items-center justify-center">
                {rooms.length}
              </div>
            </div>
          </div>
          {topics
            .filter((topic) => topic.name !== "")
            .map((topic, id) => (
              <div
                key={id}
                className="flex flex-col bg-[#fff] hover:bg-[#FFCC85] px-4 py-2 shadow-md rounded-xl mt-4 transition duration-200 cursor-pointer"
                onClick={(e) => onChangeRoom(topic.name)}
                style={{
                  backgroundColor: active === topic.name ? "#FFCC85" : "",
                }}
              >
                <div className="flex items-center">
                  <div className="w-full flex-wrap text-[#000]">
                    {topic.name}
                  </div>
                  <div className="bg-[#F58F00] rounded-full w-8 h-8 flex items-center justify-center">
                    {topic.count}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseTopics;
