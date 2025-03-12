import { useEffect, useState } from "react";

const useDirectWebSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/dm/${userId}/`);

    ws.onopen = () => console.log("WebSocket Connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => console.log("WebSocket Disconnected");

    setSocket(ws);

    return () => ws.close();
  }, [userId]);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify({ action: "send_message", msg: message }));
    }
  };

  return { messages, sendMessage };
};

export default useDirectWebSocket;
