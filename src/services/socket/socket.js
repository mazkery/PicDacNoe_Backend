const app = require("../../../app");
let onlineUsers = {};
let onlineRoom = [];
let roomIn = {};

// Socket set up
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Socket Implement
io.on("connection", (socket) => {
  socket.on("onlineUser", (username) => {
    if (username != null) {
      onlineUsers[socket.id] = username;
    }

    io.emit("onlineList", onlineUsers);
    io.emit("onlineRoom", onlineRoom);
    console.log(onlineRoom);
  });

  socket.on("createRoom", (roomId) => {
    console.log("New roomId: " + roomId);
    if (!onlineRoom.includes(roomId)) {
      roomIn[socket.id] = roomId;
      onlineRoom.push(roomId);

      io.emit("onlineRoom", onlineRoom);
    }
  });

  socket.on("disconnect", () => {
    if (onlineUsers.hasOwnProperty(socket.id)) {
      delete onlineUsers[socket.id];
      io.emit("onlineList", onlineUsers);
    }
  });

  socket.on("send-message", (messagePackage) => {
    io.to(messagePackage.room).emit("message", messagePackage.text);
  });
});

module.exports = { server, io };
