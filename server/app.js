require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const EmailOTPRoutes = require("./routes/EmailOTPRoutes.js");
const AuthRoutes = require("./routes/AuthRoutes.js");
const ResetRoutes = require("./routes/ResetRoutes.js");
const RequestRoutes = require("./routes/RequestRoutes.js");
const FriendRoutes = require("./routes/FriendRoutes.js");
const ChatRoutes = require("./routes/ChatRoutes.js");
const ProfileRoutes = require("./routes/ProfileRoutes.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
  },
});

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // Allow cookies to be sent/received
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const mongoURI = process.env.MONGO_CONN_STR;
const PORT = process.env.PORT || 3173;
const mongoOptions = { dbName: "main" };

mongoose
  .connect(mongoURI, mongoOptions)
  .then(() => console.log("Connected to main MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/email", EmailOTPRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/password-reset", ResetRoutes);
app.use("/api/request", RequestRoutes);
app.use("/api/friend", FriendRoutes);
app.use("/api/chat", ChatRoutes);

let users = {};

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("login", (userId) => {
    if (!userId.username) return;
    if (users[userId.username]) {
      console.log("User already logged in: ", userId.username);
      return;
    }
    users[userId.username] = socket.id;
    console.log("A User logged in");
    console.log("Users: ", users);
    io.emit("loggedIn", userId);
    io.emit("onlineUser", userId); // add listener on front-end and manage the status of the user
  });

  socket.on("sendMessage", ({ toUserId, message }) => {
    console.log("Received message", toUserId, message);
    const senderUserId = Object.keys(users).find(
      (key) => users[key] === socket.id
    );
    console.log("Users: ", users);
    console.log("Sender: ", senderUserId);
    const targetSocketId = users[toUserId];
    if (targetSocketId) {
      console.log("Sending message to: ", toUserId);
      io.to(targetSocketId).emit("receiveMessage", {
        fromUserId: senderUserId,
        message,
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
