import React, { useEffect, useState, useRef } from "react";
import ReaderFile from "./ReaderFile.js";
import { downloadFile } from "../utils/downloadFile.js";
import RSA from "../utils/RSA";

function ChatForm({ room, isJoined, socket }) {
  const [pesan, setPesan] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [rsa, setRsa] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);

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
  const initializeRSA = () => {
    const newRsa = new RSA(); // This will automatically generate keys
    setRsa(newRsa);
    const key = `e: ${newRsa.publicKey.e}, n: ${newRsa.publicKey.n}`;
    setPublicKey(key);
    setShowDownloadBtn(true);
};

const downloadPublicKey = () => {
  const element = document.createElement("a");
  const file = new Blob([publicKey], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = "publicKey.pub";
  document.body.appendChild(element);
  element.click(); 
  document.body.removeChild(element);
}

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
        <button
          className="w-1/4 bg-[#44288F] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA]"
          onClick={initializeRSA}
        >
          Generate Public Key
        </button>
        {showDownloadBtn && (
          <button
            className="bg-[#44288F] px-4 py-2 rounded-md"
            onClick={downloadPublicKey}
          >
            Download Public Key
          </button>
        )}
        <div className="w-3/4 border border-[#44288F] px-4 py-2 rounded-md text-[#000]">
          Public Key: {publicKey}
        </div>
      </div>
      <div className="flex text-xs md:text-base text-[#fff] gap-2 w-full">
        <button className="w-full bg-[#44288F] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA]">
          Send Public Key
        </button>
      </div>
    </div>
  );
}

export default ChatForm;
