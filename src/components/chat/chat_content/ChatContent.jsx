import { useState, useEffect } from "react";
import webSocketInstance from "../../../utils/chat/socket/webSocketInstance";
import ChatUIContainer from "./ChatUIContainer";

export default function ChatContent({ nameHeader, groupBool, chatId }) {
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

  const sendTestMessage = () => {
    try {
      const msg = {
        action: "send_message",
        message: `TEST_${Date.now()}`,
        timestamp: new Date().toISOString(),
      };

      addLog(`Sending: ${JSON.stringify(msg)}`);

      // Must stringify the message before sending
      webSocketInstance.send(msg);
    } catch (error) {
      addLog(`Error sending message: ${error}`);
    }
  };

  return (
    <div className="h-full w-full">
      <ChatUIContainer />
    </div>
  );
}
