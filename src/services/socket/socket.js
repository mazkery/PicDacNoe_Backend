const app = require("../../../app");
let onlineUsers = {};

// Socket set up
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Socket Implement
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("onlineUser", (username) => {
    console.log(username);

    onlineUsers[socket.id] = username;
    io.emit("onlineList", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("user " + onlineUsers[socket.id] + " disconnected");
    delete onlineUsers[socket.id];
    io.emit("onlineList", onlineUsers);
  });

  socket.on("send-message", (messagePackage) => {
    io.to(messagePackage.room).emit("message", messagePackage.text);
  });
});

module.exports = { server, io };
