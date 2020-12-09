const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("./src/services/user/login/passport");
const cookieSession = require("cookie-session");
require("dotenv").config();
const cors = require("cors");
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// Session
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// connect to MongoDB database
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

// Socket set up
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("online", (data) => console.log(data));

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Error");
});

module.exports = { app, server };
