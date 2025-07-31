import { useState, useEffect } from "react";
import InputChat from "./InputChat";
import ChatHeader from "./ChatHeader";
import webSocketInstance from "../../utils/chat/socket/webSocketInstance";

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
    const testMsg = {
      action: "send_message",
      message: `TEST_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    addLog(`Sending: ${JSON.stringify(testMsg)}`);
    
    // Must stringify the message before sending
    webSocketInstance.send(testMsg);
  } catch (error) {
    addLog(`Error sending message: ${error}`);
  }
};

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">WebSocket Debugger</h1>
        <div className="flex items-center gap-4 my-2">
          <div
            className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
          />
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
          <button
            onClick={sendTestMessage}
            className="px-3 py-1 bg-blue-600 rounded disabled:opacity-50"
            disabled={!isConnected}
          >
            Send Test
          </button>
        </div>
      </div>

      <div className="grow overflow-y-auto p-4 font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className="mb-1 pb-1 border-b border-gray-700">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
