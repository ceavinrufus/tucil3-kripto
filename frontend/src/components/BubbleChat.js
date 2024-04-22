import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { downloadFile } from "../utils/downloadFile";
import { bufferToUint8Array } from "../utils/converter";
import RSA from "../utils/RSA";

const downloadText = (text, filename) => {
  const element = document.createElement("a");
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename || 'download.txt'; // Default filename if none provided
  document.body.appendChild(element); // Append the element to the body
  element.click(); // Simulate click to trigger download
  document.body.removeChild(element); // Clean up
}

const BubbleChat = ({ bubble, privateKey }) => {
  const username = JSON.parse(localStorage.getItem("user")).username;
  const [toggleDecrypt, setToggleDecrypt] = useState(false);

  const rsa = new RSA();

  return (
    <div
      className={`flex divide-x-4 ${
        bubble.isSystemMessage ? "divide-[#f50000]" : "divide-[#F58F00]"
      }`}
    >
      {bubble.sender !== username && <div></div>}
      <div className="text-sm sm:text-base p-2 sm:py-4 sm:px-8 space-y-2 w-full">
        <div
        
          className={`flex gap-4 md:gap-12 items-center w-full justify-between ${
            bubble.sender === username && "flex-row-reverse"
          }`}
        >
          <div
            className={`flex gap-2 items-center ${
              bubble.sender === username && "flex-row-reverse"
            }`}
          >
            <CgProfile size={30} color={"#000"} />
            <div
              className={`${
                bubble.sender === username && "flex items-end flex-col"
              }`}
            >
              <Link
                to={"/profile/" + bubble.sender}
                className="bg-[#fff] text-[#44288F]"
              >
                @{bubble.sender}
              </Link>
              <p className="bg-[#fff] text-xs md:text-sm text-right text-[#FFCC85]">
                {bubble.date}
              </p>
            </div>
          </div>
        </div>
        <div className="">
        {bubble.pesan && (
            <div className={`flex flex-col ${bubble.sender === username && "items-end"}`}>
              <div className="flex justify-between items-center w-full">
                <p className="break-all">{!bubble.isSystemMessage ? btoa(bubble.pesan) : bubble.pesan}</p>
                {bubble.sender !== username && !bubble.isSystemMessage && (
                  <>
                    <button
                      onClick={() => downloadText(btoa(bubble.pesan), `Encrypted_Message_${bubble.date}.txt`)}
                      className="bg-[#44288F] text-[#fff] px-2 py-1 rounded-md"
                    >
                      Download Encrypted
                    </button>
                    <button
                      onClick={() => setToggleDecrypt(!toggleDecrypt)}
                      className="bg-[#44288F] text-[#fff] px-2 py-1 rounded-md ml-2"
                    >
                      Decrypt
                    </button>
                  </>
                )}
              </div>
              {toggleDecrypt && bubble.sender !== username && (
                <>
                  <p className="border-t mt-2 pt-2 border-[#44288F] break-all">{rsa.decrypt(bubble.pesan, privateKey)}</p>
                  <button
                    onClick={() => downloadText(rsa.decrypt(bubble.pesan, privateKey), `Decrypted_Message_${bubble.date}.txt`)}
                    className="bg-[#44288F] text-[#fff] px-2 py-1 rounded-md mt-2"
                  >
                    Download Decrypted
                  </button>
                </>
              )}
            </div>
          )}
          {bubble.attachment?.name && (
            <button
              className={`underline text-xs text-[#44288F] text-left w-full ${bubble.sender === username && "text-right"}`}
              onClick={() => downloadFile(bufferToUint8Array(bubble.attachment?.content), bubble.attachment?.name)}
            >
              {bubble.attachment?.name ? bubble.attachment?.name : ""}
            </button>
          )}
        </div>
      </div>
      {bubble.sender === username && <div></div>}
    </div>
  );
};

export default BubbleChat;
