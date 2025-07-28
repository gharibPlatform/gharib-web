// server.js
const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("✅ A user connected!");

  socket.on("chat message", (msg) => {
    console.log("💬 Message received:", msg);
    io.emit("chat message", msg); // Broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

