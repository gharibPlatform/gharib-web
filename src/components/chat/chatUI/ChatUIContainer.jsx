"use client";
import React, { useState, useRef, useEffect } from "react";
import MessagesList from "./MessagesList";
import TypingIndicator from "./TypingIndicator";

const ChatUIContainer = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const currentUser = {
    id: 1,
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
            avatarUrl: "https://i.pravatar.cc/150?img=5",
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

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <MessagesList messages={messages} currentUserId={currentUser.id} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="flex items-center p-3 border-t border-gray-200 bg-white">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 mx-3 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="p-2 text-blue-500 hover:text-blue-700 disabled:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatUIContainer;
