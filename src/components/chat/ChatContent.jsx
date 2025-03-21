import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import InputChat from "./InputChat";
import ChatHeader from "./ChatHeader";

export default function ChatContent({ nameHeader, groupBool }) {
  const [messages, setMessages] = useState([]); 
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    const newSocket = io("localhost:8000"); 
    setSocket(newSocket);

    newSocket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = (message) => {
    if (message.trim() && socket) {
      socket.emit("chat message", message); 
    }
  };

  return (
    <div className="flex flex-col relative bg-[var(--dark-color)] w-full h-[var(--height)]">
      <ChatHeader Name={nameHeader} GroupBool={groupBool} />

      <div className="grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-between pl-4 pr-4">
        <InputChat />
      </div>
    </div>
  );
}