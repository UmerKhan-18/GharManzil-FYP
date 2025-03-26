import { Server } from "socket.io";
import http from "http";

// Create HTTP server
const server = http.createServer();

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your frontend URL
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("User added:", onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User disconnected:", socket.id);
  });
});

// Start the server on port 4000
server.listen(4000, () => {
  console.log("✅ Socket.io server running on port 4000");
});
