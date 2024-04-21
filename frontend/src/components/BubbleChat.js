import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { downloadFile } from "../utils/downloadFile";
import { base64ToArrayBuffer } from "../utils/converter";

const BubbleChat = ({ bubble }) => {
  const username = JSON.parse(localStorage.getItem("user")).username;

  return (
    <div className="flex divide-x-[3px] divide-[#F58F00]">
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
            <p
              className={`w-full flex ${
                bubble.sender === username && "flex-row-reverse"
              }`}
            >
              {bubble.pesan}
            </p>
          )}
          {bubble.attachment?.name && (
            <button
              className={`underline text-xs text-[#44288F] text-left w-full ${
                bubble.sender === username && "text-right"
              }`}
              onClick={() =>
                downloadFile(
                  base64ToArrayBuffer(bubble.attachment?.content),
                  bubble.attachment?.name
                )
              }
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
