class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = {};
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  async connect(chatId, isGroupChat) {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token available");
      }

      // Determine the correct endpoint
      const endpoint = isGroupChat
        ? `ws://localhost:8000/ws/group/${chatId}/`
        : `ws://localhost:8000/ws/dm/${chatId}/`;

      // Create connection with token
      this.socket = new WebSocket(
        `${endpoint}?token=${encodeURIComponent(token)}`
      );

      this.socket.onopen = () => {
        this.retryCount = 0; // Reset retry counter on successful connection
        console.log("WebSocket connected");
      };

      this.socket.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          const action = data.action || "new_message";
          if (this.callbacks[action]) {
            this.callbacks[action](data);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.socket.onclose = async (e) => {
        if (e.code === 1006 && this.retryCount < this.maxRetries) {
          // Abnormal closure, attempt reconnect
          this.retryCount++;
          console.log(
            `Attempting reconnect (${this.retryCount}/${this.maxRetries})`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * this.retryCount)
          );
          this.connect(chatId, isGroupChat);
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }
  }

  addCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  sendMessage(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error("WebSocket not connected");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketInstance = new WebSocketService();
export default webSocketInstance;
