const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");
const messageRoutes = require("./routes/messageRoutes");
const friendRequestRoutes = require("./routes/friendRequestRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route setup
app.use("/api/users", userRoutes);
app.use("/api", chatRoomRoutes);
app.use("/api", messageRoutes);
app.use("/api", friendRequestRoutes);

// WebSocket setup
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { app, io };
