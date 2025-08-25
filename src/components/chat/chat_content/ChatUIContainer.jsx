"use client";
import React, { useEffect, useState } from "react";
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

  const { user } = useUserStore();

  const params = useParams();
  const groupId = params.id;
  const { groups, setGroups } = useGroupStore();
  
  const handleSendMessage = () => {
    try {
      sendMessage(newMessage);
      const index = groups?.results.findIndex((g)=>{
        return g.id == groupId
      })

      groups.results[index].last_message.message = newMessage
      groups.results[index].last_message.created_at = new Date().toISOString();

      setGroups({ ...groups, results : groups.results })

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
    <div className="flex flex-col h-full w-full mx-auto overflow-hidden">
      {/* Conditional message area */}
      {isLoadingMessages ? (
        <div className="flex-1 flex items-center justify-center text-[var(--lighter-color)]">
          Loading messages...
        </div>
      ) : !isThereMessages ? (
        <div className="flex-1 flex items-center justify-center text-[var(--lighter-color)]">
          There are no messages yet... <br /> star typing the first message!
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 bg-[var(--secondary-color)]">
          <MessagesList messages={messages} currentUserId={user.id} />
          {isTyping && <TypingIndicator />}
        </div>
      )}

      {/* Always visible input */}
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
