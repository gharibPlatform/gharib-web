import React from "react";
import ChatUI, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";

export default function ChatContentUI() {
  const { messages, appendMsg } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: "Hi, I'm ChatUI" },
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      default:
        return null;
    }
  }

  return (
    <ChatUI
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
