"use client";
import React, { useEffect, useState, useRef } from "react";
import MessagesList from "./MessagesList";
import TypingIndicator from "./TypingIndicator";
import InputChat from "./InputChat";
import useUserStore from "../../../stores/userStore";
import { useParams } from "next/navigation";
import useGroupStore from "@/stores/groupStore";

const ChatUIContainer = ({
  isLoadingMessages,
  messages,
  sendMessage,
  isThereMessages,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const initialLoadRef = useRef(true);

  const { user } = useUserStore();
  const params = useParams();
  const groupId = params.id;
  const { groups, setGroups } = useGroupStore();

  useEffect(() => {
    if (initialLoadRef.current && !isLoadingMessages && messages.length > 0) {
      scrollToBottom();
      initialLoadRef.current = false;
    }
  }, [isLoadingMessages, messages]);

  useEffect(() => {
    if (!isLoadingMessages) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSendMessage = () => {
    try {
      sendMessage(newMessage);
      const index = groups?.results.findIndex((g) => {
        return g.id == groupId;
      });

      if (index !== -1 && groups?.results[index]) {
        const updatedGroups = { ...groups };
        updatedGroups.results[index].last_message = {
          ...updatedGroups.results[index].last_message,
          message: newMessage,
          created_at: new Date().toISOString(),
        };
        setGroups(updatedGroups);
      }

      setNewMessage("");

      setTimeout(() => {
        scrollToBottom();
      }, 100);
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
    <div className="flex flex-col h-full w-full mx-auto overflow-hidden">
      {isLoadingMessages ? (
        <div className="flex-1 flex items-center justify-center text-[var(--lighter-color)]">
          Loading messages...
        </div>
      ) : !isThereMessages ? (
        <div className="flex-1 flex items-center justify-center text-[var(--lighter-color)]">
          There are no messages yet... <br /> start typing the first message!
        </div>
      ) : (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-[var(--secondary-color)]"
        >
          <MessagesList messages={messages} currentUserId={user.id} />
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}

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
