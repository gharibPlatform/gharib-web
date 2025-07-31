import React from "react";
import Bubble from "./Bubble";

const MessagesList = ({ messages, currentUserId }) => {
  return (
    <>
      {messages.map((message) => (
        <Bubble
          key={message.id}
          text={message.text}
          isSent={message.senderId === currentUserId}
          timestamp={message.timestamp}
          status={message.status}
          showAvatar={message.senderId !== currentUserId}
          avatarUrl={message.avatarUrl}
        />
      ))}
    </>
  );
};

export default MessagesList;
