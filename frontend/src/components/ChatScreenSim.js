import React, { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import ChatFormSim from "./ChatFormSim";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import KeyFormSim from "./KeyFormSim";
import BubbleChatSim from "./BubbleChatSim";

function ChatScreenSim({ user, setUser, messages, setMessages }) {
  const messagesEndRef = useRef(null);
  const [showKey, setShowKey] = useState(false);

  const [encryptKey, setEncryptKey] = useState();

  const handleToggle = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="bg-[#5E39C4] h-max p-4 justify-between items-center flex">
          <div className="flex items-center gap-2">
            <CgProfile size={30} color={"#FFF"} />
            <p className="text-white">{user.name}</p>
          </div>
          <button
            className="text-white flex items-center gap-2 hover:bg-[#724ed3] px-2 py-1 rounded-2xl transition-all"
            onClick={handleToggle}
          >
            {showKey ? (
              <>
                Hide Key Details
                <FaChevronUp color={"#FFF"} />
              </>
            ) : (
              <>
                Show Key Details
                <FaChevronDown color={"#FFF"} />
              </>
            )}
          </button>
        </div>
        <div
          className={`absolute ${
            !showKey && "hidden"
          } rounded-b-md bg-[#FFCC85] flex text-xs md:text-base text-[#fff] p-4 gap-2 w-full`}
        >
          <KeyFormSim
            encryptKey={encryptKey}
            user={user}
            setUser={setUser}
            setEncryptKey={setEncryptKey}
            setMessages={setMessages}
          />
        </div>
      </div>
      <div className="flex-grow bg-[#fff] rounded-b-xl text-[#000] h-[650px]">
        <div className="p-4 md:p-8 flex flex-col justify-between h-[100%] gap-4 divide-y-2">
          <div className="space-y-1 md:space-y-2 overflow-y-auto ">
            {messages.map((bubble, id) => (
              <BubbleChatSim key={id} bubble={bubble} user={user} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatFormSim
            sender={user.name}
            encryptKey={encryptKey}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatScreenSim;
