const app = require("../../../app");
let onlineUsers = {};

// Socket set up
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

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
});

module.exports = server;
