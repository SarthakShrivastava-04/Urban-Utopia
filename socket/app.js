import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "socket-server",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const io = new Server(server, {
  cors: {
    origin: "https://urban-utopia-jwn0.onrender.com",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  if (!onlineUser.find((u) => u.userId === userId)) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((u) => u.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
