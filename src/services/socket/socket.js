const app = require("../../../app");
const bcrypt = require("bcrypt");
const { removeAllListeners } = require("../../../app");
const saltRounds = 4;

let onlineUsers = {};
let onlineRooms = [];
let headRoom = {};
let opponent = {};
let roomIn = {};
let serverData = [
  {
    id: "id",
  },
];
let roomIdMapping = {};

// Socket set up
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Socket Implement
io.on("connection", (socket) => {
  //Them user vao danh sach online
  socket.on("onlineUser", (email) => {
    if (email != null) {
      onlineUsers[socket.id] = email;
    }

    io.emit("onlineList", onlineUsers);
    io.emit("onlineRooms", onlineRooms);
  });

  socket.on("createRoom", (displayRoomId) => {
    if (!onlineRooms.includes(displayRoomId)) {
      headRoom[socket.id] = displayRoomId;
      onlineRooms.push(displayRoomId);

      bcrypt.hash(Date.now(), saltRounds, function (err, hash) {
        roomIdMapping[displayRoomId] = hash;
        socket.join(hash);
      });

      io.emit("onlineRooms", onlineRooms);
    }
  });

  socket.on("joinRoom", (displayRoomId, email) => {
    // Kiem tra roomId ton tai va join vao room
    if (onlineRooms.includes(displayRoomId)) {
      socket.join(roomIdMapping[displayRoomId]);
    }

    //Neu room chua co doi thu thi assign doi thu
    if (!opponent.hasOwnProperty(displayRoomId)) {
      opponent[displayRoomId] = socket.id;

      // emit ve room co the bat dau
      io.emit(displayRoomId, email);
    }
  });

  socket.on("leaveRoom", (displayRoomId) => {
    leaveRoomByUser(socket, displayRoomId);
  });

  // Unregister cho tung thanh vien trong room (khong phai player)
  socket.on("removedRoom", (displayRoomId) => {
    socket.leave(roomIdMapping.displayRoomId);
  });

  socket.on("disconnect", () => {
    let displayRoomId = roomIn[socket.id];

    leaveRoomByUser(socket, displayRoomId);

    delete onlineUsers[socket.id];
    io.emit("onlineList", onlineUsers);
  });

  socket.on("send-message", (messagePackage) => {
    io.to(messagePackage.room).emit("newMessage", messagePackage.text);
  });
});

function removeAllMember(io, displayRoomId) {
  //Emit ve fe de out room
  io.emit("removedRoom", displayRoomId);
  //Xoa tham chieu
  delete roomIdMapping.displayRoomId;
  //Xoa khoi onlineRooms
  let index = onlineRooms.indexOf(displayRoomId);
  onlineRooms.slice(index, 1);

  //Cap nhat lai danh sach onlineRooms cho client
  io.emit("onlineRooms", onlineRooms);
  console.log(onlineRooms);
}

function leaveRoomByUser(socket, displayRoomId) {
  // Neu chu room roi phong thi xoa cac socket con lai trong room
  if (headRoom.hasOwnProperty(socket.id)) {
    removeAllMember();
  } else {
    //Neu la doi thu
    if (opponent[displayRoomId] === socket.id) {
      // Xu ly thang thua ben trong
    } else {
      socket.leave(roomIdMapping[roomIn[socket.id]]);
    }
  }
}

module.exports = { server, io };
