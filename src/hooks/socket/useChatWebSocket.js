import { useState, useEffect, useCallback } from "react";
import webSocketInstance from "../../utils/chat/socket/webSocketInstance";
import useChatStore from "../../stores/useChatStore";

const registeredChats = new Set();

export default function useChatWebSocket(chatId, groupBool) {
  const [isConnected, setIsConnected] = useState(false);
  const { addMessage } = useChatStore();

  const handleMessage = useCallback(
    (data) => {
      addMessage(chatId, { ...data });
    },
    [chatId, addMessage]
  );

  const handleConnectionChange = useCallback((connected) => {
    setIsConnected(connected);
  }, []);

  useEffect(() => {
    if (registeredChats.has(chatId)) return; // already registered
    registeredChats.add(chatId);

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
      registeredChats.delete(chatId);
    };
  }, [chatId, groupBool, handleMessage, handleConnectionChange]);

  const sendMessage = useCallback(
    (messageContent) => {
      webSocketInstance.send({
        action: "send_message",
        chat: groupBool ? `g_${chatId}` : chatId,
        message: messageContent,
      });
    },
    [chatId, groupBool]
  );

  return { isConnected, sendMessage };
}
