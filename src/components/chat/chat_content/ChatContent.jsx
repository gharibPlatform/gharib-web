import { useState, useEffect } from "react";
import webSocketInstance from "../../../utils/chat/socket/webSocketInstance";
import ChatUIContainer from "./ChatUIContainer";

export default function ChatContent({
  isLoadingMessages,
  groupBool,
  chatId,
  messages,
}) {
  const [logs, setLogs] = useState(["Initializing test..."]);
  const [isConnected, setIsConnected] = useState(false);

  const addLog = (message) => {
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  useEffect(() => {
    const handleConnectionChange = (connected) => {
      setIsConnected(connected);
      console.log("connection change", connected);
      addLog(`Connection ${connected ? "established" : "lost"}`);
    };

    const handleMessage = (data) => {
      addLog(`Received: ${JSON.stringify(data)}`);
    };

    const handleError = (error) => {
      addLog(`Error: ${error.message || JSON.stringify(error)}`);
    };

    addLog("Registering WebSocket callbacks...");
    webSocketInstance.addCallbacks({
      connection_change: handleConnectionChange,
      new_message: handleMessage,
      error: handleError,
    });

    addLog("Attempting to connect...");
    webSocketInstance.connect(chatId, groupBool).catch((err) => {
      addLog(`Connection failed: ${err.message}`);
    });

    return () => {
      webSocketInstance.disconnect();
    };
  }, [chatId, groupBool]);

  const sendMessage = () => {
    try {
      const msg = {
        action: "send_message",
        chat: `g_${chatId}`,
        message: `TEST_${Date.now()}`,
      };

      webSocketInstance.send(msg);
    } catch (error) {
      addLog(`Error sending message: ${error}`);
    }
  };

  return (
    <div className="h-full w-full">
      <ChatUIContainer
        sendMessage={sendMessage}
        isLoadingMessages={isLoadingMessages}
        initialMessages={messages}
        chatId={chatId}
      />
    </div>
  );
}
