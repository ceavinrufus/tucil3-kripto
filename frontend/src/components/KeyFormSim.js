import React, { useState } from "react";
import RSA from "../utils/RSA";
import ReaderKey from "./ReaderKey";

function KeyFormSim({ user, encryptKey, setEncryptKey, setMessages, setUser }) {
  const [publicKey, setPublicKey] = useState(user.publicKey);
  const [privateKey, setPrivateKey] = useState(user.privateKey);

  const initializeRSA = (e) => {
    e.preventDefault();

    const rsa = new RSA();
    const pubKey = { e: rsa.publicKey.e, n: rsa.publicKey.n };
    const priKey = { d: rsa.privateKey.d, n: rsa.publicKey.n };
    setPublicKey(pubKey);
    setPrivateKey(priKey);
    setUser({ ...user, publicKey: pubKey, privateKey: priKey });
  };

  const sendPublicKey = (e) => {
    e.preventDefault();
    const file = new Blob([JSON.stringify(publicKey)], { type: "text/plain" });
    if (file) {
      const time = new Date().toString();
      const bubble = {
        pesan: "Sent a public key",
        key: {
          name: `publicKey_${user.name}.pub`,
          content: file,
        },
        date: time.substring(4, 24),
        sender: user.name,
        isSystemMessage: true,
      };
      setMessages((prev) => [...prev, bubble]);
    }
  };

  const downloadPrivateKey = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(privateKey)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "privateKey.pri";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPublicKey = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(publicKey)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "publicKey.pub";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex text-xs md:text-base text-[#fff] gap-2 w-full">
        <div className="w-full border border-[#44288F] px-4 py-2 rounded-md text-[#000]">
          {publicKey ? (
            <>
              <p>Your Public Key:</p>
              <p>e: {publicKey.e}</p>
              <p>n: {publicKey.n}</p>
            </>
          ) : (
            <>You haven't generated a public key yet</>
          )}
        </div>
        <div className="w-full border border-[#44288F] px-4 py-2 rounded-md text-[#000]">
          {privateKey ? (
            <>
              <p>Your Private Key:</p>
              <p>d: {privateKey.d}</p>
              <p>n: {privateKey.n}</p>
            </>
          ) : (
            <>You haven't generated a private key yet</>
          )}
        </div>
      </div>
      <div className="flex text-xs md:text-base text-[#fff] gap-2 w-full">
        {publicKey && (
          <button
            className="bg-[#44288F] px-4 py-2 rounded-md w-1/2"
            onClick={downloadPublicKey}
          >
            Download Public Key
          </button>
        )}
        {privateKey && (
          <button
            className="bg-[#44288F] px-4 py-2 rounded-md w-1/2"
            onClick={downloadPrivateKey}
          >
            Download Private Key
          </button>
        )}
      </div>
      <div className="flex flex-col text-xs md:text-base text-[#fff] gap-2 w-full">
        <button
          disabled={publicKey && privateKey}
          className="w-full bg-[#44288F] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA]"
          onClick={initializeRSA}
        >
          {publicKey && privateKey ? "Key Already Generated" : "Generate Key"}
        </button>
        <button
          onClick={sendPublicKey}
          className="w-full bg-[#44288F] px-4 py-2 rounded-md placeholder-[#000] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#9881DA]"
          disabled={!publicKey}
        >
          Send Public Key
        </button>
      </div>
      <div className="border border-[#44288F]"></div>
      <div
        className={`${
          encryptKey ? "flex-col-reverse" : "flex-col"
        } flex text-black gap-2`}
      >
        {encryptKey ? (
          <div
            div
            className="w-full border border-[#44288F] px-4 py-2 rounded-md text-[#000] text-xs md:text-base"
          >
            <p>Their Public Key:</p>
            <p>e: {encryptKey.e}</p>
            <p>n: {encryptKey.n}</p>
          </div>
        ) : (
          <>Upload their public key to start the conversation!</>
        )}
        <div className="border p-2 rounded-md border-[#44288F]">
          <ReaderKey setContent={setEncryptKey} />
        </div>
      </div>
    </div>
  );
}

export default KeyFormSim;
