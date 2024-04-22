import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { downloadFile } from "../utils/downloadFile";
import { bufferToUint8Array } from "../utils/converter";
import RSA from "../utils/RSA";

const downloadText = (text, filename) => {
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const BubbleChat = ({ bubble, privateKey }) => {
  const username = JSON.parse(localStorage.getItem("user")).username;
  const [decryptedText, setDecryptedText] = useState("");
  const [decryptedFile, setDecryptedFile] = useState();

  const rsa = new RSA();

  const handleDecrypt = () => {
    const decrypted = rsa.decrypt(bubble.pesan, privateKey);
    if (bubble.attachment) {
      const decryptedFile = rsa.decryptFile(
        bufferToUint8Array(bubble.attachment?.content),
        privateKey
      );
      setDecryptedFile(decryptedFile);
    }
    setDecryptedText(decrypted);
  };

  return (
    <div
      className={`flex ${
        bubble.sender === username ? "justify-end" : "justify-start"
      } `}
    >
      <div className="text-sm sm:text-base p-2 sm:py-4 sm:px-8 space-y-2 w-full max-w-xs bg-gray-100 rounded-lg">
        <div className="flex flex-col items-start">
          <CgProfile size={30} color={"#000"} />
          <div>
            <Link to={"/profile/" + bubble.sender} className=" text-[#44288F]">
              @{bubble.sender}
            </Link>
            <p className="text-xs md:text-sm text-right text-[#FFCC85]">
              {bubble.date}
            </p>
          </div>
        </div>
        <div>
          <p className="break-all bg-gray-200 p-2 rounded">
            {!bubble.isSystemMessage ? btoa(bubble.pesan) : bubble.pesan}
          </p>
          {bubble.attachment?.name && (
            <button
              className={`underline text-xs text-[#44288F] text-left w-full ${
                bubble.sender === username && "text-right"
              }`}
              onClick={() =>
                downloadFile(
                  bufferToUint8Array(bubble.attachment?.content),
                  bubble.attachment?.name
                )
              }
            >
              {bubble.attachment?.name}
            </button>
          )}
          {bubble.sender !== username && !bubble.isSystemMessage && (
            <>
              <button
                onClick={() =>
                  downloadText(
                    btoa(bubble.pesan),
                    `Encrypted_Message_${bubble.date}.txt`
                  )
                }
                className="bg-[#44288F] text-[#fff] px-2 py-1 rounded-md mt-2"
              >
                Download Encrypted
              </button>
              <button
                onClick={handleDecrypt}
                className="bg-[#44288F] text-[#fff] px-2 py-1 rounded-md mt-2"
              >
                Decrypt
              </button>
            </>
          )}
          {(decryptedText || decryptedFile) && bubble.sender !== username && (
            <>
              {decryptedText && (
                <p className="break-all bg-green-200 p-2 rounded mt-2">
                  {decryptedText}
                </p>
              )}
              {bubble.attachment?.name && (
                <button
                  className={`underline text-xs text-[#44288F] text-left w-full ${
                    bubble.sender === username && "text-right"
                  }`}
                  onClick={() =>
                    downloadFile(decryptedFile, bubble.attachment?.name)
                  }
                >
                  {bubble.attachment?.name}
                </button>
              )}
              <button
                onClick={() =>
                  downloadText(
                    decryptedText,
                    `Decrypted_Message_${bubble.date}.txt`
                  )
                }
                className="bg-[#44288F] text-[#fff] px-2 py-1 rounded-md mt-2"
              >
                Download Decrypted
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BubbleChat;
