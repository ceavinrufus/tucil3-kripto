import React, { useState } from "react";
import ChatScreenSim from "../ChatScreenSim";

const Simulator = () => {
  const [messages, setMessages] = useState([]);

  const [alice, setAlice] = useState({
    name: "Alice Cantik",
    privateKey: "",
    publicKey: "",
  });

  const [bob, setBob] = useState({
    name: "Bob Ganteng",
    privateKey: "",
    publicKey: "",
  });

  return (
    <div className="bg-[#F58F00] min-h-screen py-4 px-12">
      {/* Room Header */}
      <div className="flex items-center justify-between my-5 text-[#fff] ">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Simualtion Room</h1>
          <h1 className="text-xl">
            Too use the real chat functionality, please login.
          </h1>
        </div>
      </div>

      {/* Chat */}
      <div className="flex w-full gap-4">
        <ChatScreenSim
          messages={messages}
          setMessages={setMessages}
          user={alice}
          setUser={setAlice}
        />
        <div className="border border-[#5E39C4] border-dashed"></div>
        <ChatScreenSim
          messages={messages}
          setMessages={setMessages}
          user={bob}
          setUser={setBob}
        />
      </div>
    </div>
  );
};

export default Simulator;
