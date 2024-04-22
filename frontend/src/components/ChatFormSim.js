import React, { useState } from "react";
import ReaderFile from "./ReaderFile.js";
import { downloadFile } from "../utils/downloadFile.js";
import RSA from "../utils/RSA.js";

function ChatFormSim({ sender, encryptKey, setMessages }) {
  const [pesan, setPesan] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const rsa = new RSA();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesan !== "" || file) {
      const time = new Date().toString();
      const bubble = {
        pesan: pesan ? rsa.encrypt(pesan, encryptKey) : null,
        attachment: {
          name: fileName,
          content: file ? rsa.encryptFile(file, encryptKey) : null,
        },
        date: time.substring(4, 24),
        sender: sender,
        isSystemMessage: false,
      };
      setMessages((prev) => [...prev, bubble]);
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
        <ReaderFile
          id={sender}
          disabled={!encryptKey}
          setFile={setFile}
          setFileName={setFileName}
        />
        <input
          className={
            "bg-[#FFCC85] w-full px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed text-xs md:text-base"
          }
          type="text"
          disabled={!encryptKey}
          placeholder={
            encryptKey
              ? "Write your message here"
              : "You need to have their public key first"
          }
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
        <input
          type="submit"
          className={
            "bg-[#44288F] text-[#fff] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA] text-xs md:text-base"
          }
          disabled={!encryptKey}
          value={"Encrypt & Send"}
        />
      </form>
    </div>
  );
}

export default ChatFormSim;
