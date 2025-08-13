import { useState, useEffect, useCallback } from "react";
import webSocketInstance from "../../utils/chat/socket/webSocketInstance";
import useChatStore from "../../stores/useChatStore";

export default function useChatWebSocket(chatId, groupBool) {
  const [isConnected, setIsConnected] = useState(false);
  const { addMessage } = useChatStore();

  // Stable callback for message handling
  const handleMessage = useCallback(
    (data) => {
      console.log("Received message data:", data);

      console.log("Adding message to store:", data.message);
      addMessage(chatId, {
        ...data,

      });
    },
    [chatId, addMessage]
  );

  const handleConnectionChange = useCallback((connected) => {
    setIsConnected(connected);
    console.log(`Connection ${connected ? "established" : "lost"}`);
  }, []);

  useEffect(() => {
    const callbacks = {
      connection_change: handleConnectionChange,
      send_message: handleMessage,
      error: (error) => console.error("WebSocket error:", error),
    };

    webSocketInstance.addCallbacks(callbacks);

    if (webSocketInstance.socket?.readyState !== WebSocket.OPEN) {
      webSocketInstance.connect(chatId, groupBool).catch(console.error);
    }

    return () => {
      webSocketInstance.removeCallbacks(Object.keys(callbacks));
    };
  }, [chatId, groupBool, handleMessage, handleConnectionChange]);

  const sendMessage = useCallback(
    (messageContent) => {
      try {
        const message = {
          action: "send_message",
          chat: groupBool ? `g_${chatId}` : chatId,
          message: {
            content: messageContent,
            timestamp: new Date().toISOString(),
          },
        };
        webSocketInstance.send(message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [chatId, groupBool]
  );

  return { isConnected, sendMessage };
}
