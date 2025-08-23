"use client";
import React from "react";
import Bubble from "./Bubble";
import { motion, AnimatePresence } from "framer-motion";

const MessagesList = ({ messages, currentUserId }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString.replace(/(\.\d{3})\d+Z$/, "$1Z"));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <AnimatePresence initial={false}>
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Bubble
            text={message.message}
            username={message.sender.username}
            isSent={message.sender.id === currentUserId}
            timestamp={formatTime(message.updated_at)}
            showAvatar={message.sender.id !== currentUserId}
            avatarUrl={message.sender.profile_pic || ""}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default MessagesList;
