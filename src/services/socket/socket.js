const app = require("../../../app");
const bcrypt = require("bcrypt");
const { removeAllListeners } = require("../../../app");
const saltRounds = 4;

let onlineUsers = {};
let onlineRooms = [];
let headRoom = {};
let subRoom = {};
let opponent = {};
let roomIn = {};
let roomMessages = {};
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
  socket.on("onlineUser", (name) => {
    if (name != null) {
      onlineUsers[socket.id] = name;
    }

    io.emit("onlineList", onlineUsers);
    io.emit("onlineRooms", onlineRooms);
  });

  socket.on("createRoom", (displayRoomId) => {
    if (!onlineRooms.includes(displayRoomId)) {
      headRoom[socket.id] = displayRoomId;
      roomIn[socket.id] = displayRoomId;
      onlineRooms.push(displayRoomId);

      bcrypt.hash(Date.now(), saltRounds, function (err, hash) {
        roomIdMapping[displayRoomId] = hash;
        socket.join(displayRoomId);
      });

      //Tao danh sach message;
      roomMessages[displayRoomId] = [];

      io.emit("onlineRooms", onlineRooms);
    }
  });

  socket.on("joinRoom", (joinInfo) => {
    let displayRoomId = joinInfo.roomId;
    let name = joinInfo.name;
    // Kiem tra roomId ton tai va join vao room
    if (onlineRooms.includes(displayRoomId)) {
      socket.join(displayRoomId);
      roomIn[socket.id] = joinInfo.roomId;
    }

    //Neu room chua co doi thu thi assign doi thu
    if (!opponent.hasOwnProperty(displayRoomId)) {
      opponent[displayRoomId] = socket.id;
      subRoom[socket.id] = displayRoomId;

      // emit ve room co the bat dau
      io.to(displayRoomId).emit(displayRoomId, {
        label: "opponent",
        name: name,
      });
    }
  });

  socket.on("leaveRoom", (displayRoomId) => {
    leaveRoomByUser(io, socket, displayRoomId);
  });

  // Unregister cho tung thanh vien trong room (khong phai player)
  socket.on("removedRoom", (displayRoomId) => {
    socket.leave(roomIdMapping[displayRoomId]);
  });

  socket.on("onServerLocalRoom", (message) => {
    let displayRoomId = roomIn[socket.id];

    handleRoomMessage(io, message, displayRoomId);
  });

  socket.on("disconnect", () => {
    let displayRoomId = roomIn[socket.id];

    leaveRoomByUser(io, socket, displayRoomId);

    delete onlineUsers[socket.id];
    io.emit("onlineList", onlineUsers);
  });
});

function handleRoomMessage(io, message, displayRoomId) {
  // Tin nhan moi
  if (message.label === "sendMessage") {
    //Them tin nhan moi vao list
    roomMessages[displayRoomId].push({
      token: message.token,
      name: message.name,
      text: message.text,
    });
    // Cap nhat xuong toan bo client
    io.to(displayRoomId).emit("localRoom", {
      label: "updateMessage",
      token: message.token,
      name: message.name,
      text: message.text,
    });
  }

  // Lay toan bo tin nhan
  if (message.label === "requestAllMessages") {
    let allMessagesInfo = roomMessages[displayRoomId];

    io.to(displayRoomId).emit("localRoom", {
      label: "getAllMessages",
      allMessages: allMessagesInfo,
    });
  }
}

function removeAllMember(io, displayRoomId) {
  //Emit ve fe de out room
  io.to(displayRoomId).emit("removedRoom", displayRoomId);
  //Xoa tham chieu
  delete roomIdMapping[displayRoomId];
  //Xoa khoi onlineRooms
  let index = onlineRooms.indexOf(displayRoomId);
  onlineRooms.slice(index, 1);

  //Cap nhat lai danh sach onlineRooms cho client
  io.emit("onlineRooms", onlineRooms);
}

function leaveRoomByUser(io, socket, displayRoomId) {
  // Neu chu room roi phong thi xoa cac socket con lai trong room
  if (headRoom.hasOwnProperty(socket.id)) {
    removeAllMember(io, displayRoomId);
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
