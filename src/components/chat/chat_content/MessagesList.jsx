import React from "react";
import Bubble from "./Bubble";

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
    <>
      {messages.map((message) => (
        <Bubble
          key={message.id}
          text={message.message}
          username={message.sender.username}
          isSent={message.sender.id === currentUserId}
          timestamp={formatTime(message.updated_at)}
          showAvatar={message.sender.id !== currentUserId}
          avatarUrl={message.sender.profile_pic || ""}
        />
      ))}
    </>
  );
};

export default MessagesList;
