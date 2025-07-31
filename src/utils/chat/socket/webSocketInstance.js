import { wsActions } from "./apiChat";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = {};
    this.retryCount = 0;
    this.maxRetries = 5;
    this.reconnectDelay = 1000;
    this.pingInterval = 30000;
    this.pingTimer = null;
    this.messageQueue = [];
    this.currentChatId = null;
    this.isGroupChat = false;
  }

  async connect(chatId, isGroupChat) {
    this.currentChatId = chatId;
    this.isGroupChat = isGroupChat;

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token available");
      }

      const endpoint = isGroupChat
        ? `ws://localhost:8000/group/${chatId}/`
        : `ws://localhost:8000/dm/${chatId}/`;

      this.socket = new WebSocket(
        `${endpoint}?token=${encodeURIComponent(token)}`
      );

      this.socket.onopen = () => this.handleOpen();
      this.socket.onmessage = (e) => this.handleMessage(e);
      this.socket.onclose = (e) => this.handleClose(e);
      this.socket.onerror = (error) => this.handleError(error);
    } catch (error) {
      console.error("WebSocket connection error:", error);
      this.notifyError(error);
    }
  }

  handleOpen() {
    this.retryCount = 0;
    console.log("WebSocket connected");
    this.startPing();
    this.flushMessageQueue();
    this.notifyStatusChange(true);
  }

  handleMessage(e) {
    try {
      let data;
      try {
        data = JSON.parse(e.data);
      } catch (parseError) {
        console.warn("Received non-JSON message:", e.data);
        this.handleNonJsonMessage(e.data);
        return;
      }

      console.log("WebSocket message received:", data);

      // Handle ping/pong separately
      if (data.type === "pong" || data.action === "pong") {
        return;
      }

      const action = data.action || data.type || "new_message";

      if (action === "error" || data.error) {
        this.handleErrorMessage(data);
        return;
      }

      if (this.callbacks[action]) {
        try {
          this.callbacks[action](data);
        } catch (callbackError) {
          console.error("Error in callback for action:", action, callbackError);
        }
      }

      if (this.callbacks["*"]) {
        try {
          this.callbacks["*"](data);
        } catch (wildcardError) {
          console.error("Error in wildcard callback:", wildcardError);
        }
      }
    } catch (error) {
      console.error("Unexpected error in message handling:", error);
    }
  }

  // New method to handle non-JSON messages
  handleNonJsonMessage(rawData) {
    // Try to extract meaningful information
    const message = {
      raw: rawData,
      timestamp: new Date().toISOString(),
      warning: "Received non-JSON message",
    };

    // Special handling for plain text messages
    if (typeof rawData === "string" && rawData.startsWith("Error:")) {
      this.handleErrorMessage({
        error: true,
        message: rawData,
      });
      return;
    }

    // Pass to raw data handler if registered
    if (this.callbacks.raw_data) {
      this.callbacks.raw_data(message);
    }
  }

  handleClose(e) {
    console.log(
      `WebSocket closed (code: ${e.code}, reason: ${e.reason || "none"})`
    );
    this.stopPing();
    this.notifyStatusChange(false);

    if (e.code === 1006 && this.retryCount < this.maxRetries) {
      this.retryCount++;
      const delay = this.reconnectDelay * Math.pow(2, this.retryCount - 1);
      console.log(
        `Reconnecting in ${delay}ms (attempt ${this.retryCount}/${this.maxRetries})`
      );

      setTimeout(() => {
        this.connect(this.currentChatId, this.isGroupChat);
      }, delay);
    }
  }

  handleError(error) {
    console.error("WebSocket error:", error);
    this.notifyError(error);
  }

  handleErrorMessage(data) {
    console.error("WebSocket error message:", data);
    if (this.callbacks.error) {
      this.callbacks.error(data);
    }

    if (data.code === "token_expired") {
      this.handleTokenRefresh();
    }
  }

  async handleTokenRefresh() {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetch("/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error("Token refresh failed");

      const { access } = await response.json();
      localStorage.setItem("access_token", access);
      this.connect(this.currentChatId, this.isGroupChat);
    } catch (error) {
      console.error("Token refresh failed:", error);
      this.notifyError({
        code: "authentication_failed",
        message: "Please login again",
      });
    }
  }

  startPing() {
    this.pingTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ action: "ping" }));
      }
    }, this.pingInterval);
  }

  stopPing() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  flushMessageQueue() {
    while (
      this.messageQueue.length > 0 &&
      this.socket?.readyState === WebSocket.OPEN
    ) {
      const message = this.messageQueue.shift();
      this.socket.send(JSON.stringify(message));
    }
  }

  notifyStatusChange(isConnected) {
    if (this.callbacks.connection_change) {
      this.callbacks.connection_change(isConnected);
    }
  }

  notifyError(error) {
    if (this.callbacks.error) {
      this.callbacks.error(error);
    }
  }

  addCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  removeCallbacks(callbackNames) {
    callbackNames.forEach((name) => delete this.callbacks[name]);
  }

  send(actionType, payload = {}) {
    let message;

    if (typeof actionType === "string" && wsActions[actionType]) {
      message = wsActions[actionType](...Object.values(payload));
    } else if (
      actionType &&
      typeof actionType === "object" &&
      !Array.isArray(actionType)
    ) {
      message = actionType;
    } else {
      console.error("Invalid action type or payload");
      return false;
    }

    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn("Queuing message - WebSocket not ready");
      this.messageQueue.push(message);
      return false;
    }

    try {
      this.socket.send(JSON.stringify(message));
      console.log("Message sent:", message);
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  }

  disconnect() {
    if (this.socket) {
      this.stopPing();
      this.socket.close();
      this.socket = null;
    }
  }
}

const webSocketInstance = new WebSocketService();
export default webSocketInstance;
