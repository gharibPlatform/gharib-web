"use client";
import React, { useEffect, useState } from "react";
import MessagesList from "./MessagesList";
import TypingIndicator from "./TypingIndicator";
import InputChat from "./InputChat";
import useChatWebSocket from "../../../hooks/socket/useChatWebSocket.js";

const ChatUIContainer = ({ isLoadingMessages, messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);


  const currentUser = {
    id: 1,
  };

  const handleSendMessage = () => {
    try {
      sendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.log(`Error sending message: ${error}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {isLoadingMessages ? (
        <div className="flex flex-col h-full w-full mx-auto text-[var(--lighter-color)]">
          Loading messages ...
        </div>
      ) : (
        <div className="flex flex-col h-full w-full mx-auto overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 bg-[var(--secondary-color)]">
            <MessagesList messages={messages} currentUserId={currentUser.id} />
            {isTyping && <TypingIndicator />}
          </div>

          <InputChat
            handleKeyPress={handleKeyPress}
            handleOnChange={handleOnChange}
            value={newMessage}
            handleSendMessage={handleSendMessage}
            disabled={!newMessage.trim()}
          />
        </div>
      )}
    </>
  );
};

export default ChatUIContainer;
