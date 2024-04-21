import React, { useEffect, useState, useRef } from "react";
import ReaderFile from "./ReaderFile.js";
import { downloadFile } from "../utils/downloadFile.js";

function ChatForm({ room, isJoined, socket }) {
  const [pesan, setPesan] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesan !== "" || file) {
      socket.emit(
        "send-message",
        pesan,
        { name: fileName, content: file },
        room._id,
        JSON.parse(localStorage.getItem("user")).username
      );
    }
    setFile(null);
    setFileName("");
    setPesan("");
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className={`underline text-[#44288F] text-left ${
          !fileName && "invisible"
        }`}
        onClick={() => downloadFile(file, fileName)}
      >
        {fileName ? fileName : "."}
      </button>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full"
      >
        <ReaderFile setFile={setFile} setFileName={setFileName} />
        <input
          className={
            "bg-[#FFCC85] w-full px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed text-xs md:text-base"
          }
          type="text"
          disabled={!isJoined}
          placeholder={
            isJoined
              ? "Write your message here"
              : "You must join the room first"
          }
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
        <input
          type="submit"
          className={
            "bg-[#44288F] text-[#fff] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA] text-xs md:text-base"
          }
          disabled={!isJoined}
          value={"Encrypt & Send"}
        />
      </form>
      <div className="flex text-xs md:text-base text-[#fff] gap-2 w-full">
        <button className="w-1/2 bg-[#44288F] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA]">
          Generate Public Key
        </button>
        <button className="w-1/2 bg-[#44288F] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA]">
          Send Public Key
        </button>
      </div>
    </div>
  );
}

export default ChatForm;
