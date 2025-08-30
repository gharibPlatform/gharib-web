"use client";
import React from "react";
import Bubble from "./Bubble";
import { motion, AnimatePresence } from "framer-motion";
import { groupMessages } from "@/utils/groupMessages";

const MessagesList = ({ messages, currentUserId }) => {
  const formatTime = (isoString) => {
    if (!isoString) return "";
    
    try {
      const date = new Date(isoString.replace(/(\.\d{3})\d+Z$/, "$1Z"));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };

  const groupedMessages = groupMessages(messages);

  return (
    <AnimatePresence initial={false}>
      {groupedMessages.map((group, groupIndex) => {
        const isUserGroup = group.senderId === currentUserId;

        return (
          <div
            key={groupIndex}
            className={`flex flex-col ${isUserGroup ? "items-end" : "items-start"} mb-2`}
          >
            {group.messages.map((message, messageIndex) => {
              const isLastInGroup = messageIndex === group.messages.length - 1;
              const isFirstInGroup = messageIndex === 0;

              return (
                <motion.div
                  key={message.message_id || `${groupIndex}-${messageIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={messageIndex > 0 ? "mt-1" : ""}
                >
                  <Bubble
                    text={message.message}
                    username={message.sender.username}
                    isSent={message.sender.id === currentUserId}
                    timestamp={
                      isLastInGroup ? formatTime(message.created_at || message.updated_at) : ""
                    }
                    showAvatar={!isUserGroup && isLastInGroup}
                    avatarUrl={message.sender.profile_pic || ""}
                    showUsername={!isUserGroup && isFirstInGroup}
                    roundedBottom={isLastInGroup}
                    roundedTop={isFirstInGroup}
                  />
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </AnimatePresence>
  );
};

export default MessagesList;