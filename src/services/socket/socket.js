const app = require("../../../app");
let onlineUsers = [];

// Socket set up
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("onlineUser", (username) => {
    console.log(username);
    onlineUsers.push(username);
    socket.emit("onlineList", onlineUsers);
  });

  socket.on("offlineUser", (username) => {
    console.log(username + " disconected");
    let index = onlineUsers.indexOf(username);
    onlineUsers.splice(index, 1);
    socket.emit("onlineList", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

module.exports = server;
