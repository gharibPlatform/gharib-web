"use client";
import React, { useEffect, useState } from "react";
import MessagesList from "./MessagesList";
import TypingIndicator from "./TypingIndicator";
import InputChat from "./InputChat";
import webSocketInstance from "../../../utils/chat/socket/webSocketInstance";

const ChatUIContainer = ({ isLoadingMessages, initialMessages, chatId }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentUser = {
    id: 1,
  };

  const handleSendMessage = () => {
    try {
      const msg = {
        action: "send_message",
        chat: `g_${chatId}`,
        message: newMessage,
      };

      webSocketInstance.send(msg);
      // setMessages([...messages, msg]);
      // setNewMessage("");
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

  useEffect(() => {
    console.log("initial messages : ", initialMessages);
    console.log("messages : ", messages);
  }, [initialMessages]);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

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
