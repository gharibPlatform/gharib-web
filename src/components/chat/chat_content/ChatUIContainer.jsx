"use client";
import React, { useState } from "react";
import MessagesList from "./MessagesList";
import TypingIndicator from "./TypingIndicator";
import InputChat from "./InputChat";

const ChatUIContainer = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentUser = {
    id: 1,
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      text: newMessage,
      senderId: currentUser.id,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate reply after 1-3 seconds
    if (Math.random() > 0.3) {
      setIsTyping(true);
      setTimeout(
        () => {
          const replies = [
            "That's interesting!",
            "I see what you mean.",
            "Let me think about that...",
            "Thanks for sharing!",
            "What else is new?",
            "I agree with you.",
          ];
          const reply = {
            id: Date.now(),
            text: replies[Math.floor(Math.random() * replies.length)],
            senderId: "other-user",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            avatarUrl: "https://i.pravatar.cc/150?img=1",
          };
          setMessages((prev) => [...prev, reply]);
          setIsTyping(false);
        },
        1000 + Math.random() * 2000
      );
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
  );
};

export default ChatUIContainer;
