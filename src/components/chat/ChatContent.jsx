import { useState, useEffect } from "react";
import InputChat from "./InputChat";
import ChatHeader from "./ChatHeader";
import webSocketInstance from "../../utils/webSocketInstance";
import api from "../../utils/api";

export default function ChatContent({ nameHeader, groupBool, chatId }) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket
    webSocketInstance.connect(chatId, groupBool);

    // Set up message handlers
    webSocketInstance.addCallbacks({
      new_message: (data) => {
        setMessages((prev) => [...prev, data]);
      },
      message_error: (error) => {
        console.error("WebSocket message error:", error);
        if (error.code === "token_expired") {
          handleTokenRefresh();
        }
      },
    });

    // Initial message load
    const fetchInitialMessages = async () => {
      try {
        const endpoint = groupBool
          ? `/api/groups/${chatId}/messages/`
          : `/api/direct-messages/${chatId}/`;

        const response = await api.get(endpoint);
        setMessages(response.data);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    fetchInitialMessages();

    return () => {
      webSocketInstance.disconnect();
    };
  }, [chatId, groupBool]);

  const handleTokenRefresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("access_token", response.data.access);

      // Reconnect with new token
      webSocketInstance.disconnect();
      webSocketInstance.connect(chatId, groupBool);
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    try {
      const messageData = {
        action: "send_message",
        text: messageText,
        timestamp: new Date().toISOString(),
      };

      // Optimistic UI update
      setMessages((prev) => [
        ...prev,
        {
          ...messageData,
          sender: "You",
          status: "sending",
        },
      ]);

      webSocketInstance.sendMessage(messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col relative bg-[var(--dark-color)] w-full h-[var(--height)]">
      <ChatHeader Name={nameHeader} GroupBool={groupBool} />

      <div className="grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${msg.status === "sending" ? "opacity-60" : ""}`}
          >
            <strong>{msg.sender || "You"}:</strong> {msg.text}
            {msg.status === "sending" && (
              <span className="ml-2 text-xs">Sending...</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-between pl-4 pr-4">
        <InputChat onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
