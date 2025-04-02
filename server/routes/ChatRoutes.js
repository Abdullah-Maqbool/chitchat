const express = require("express");
const {
  getChats,
  getChat,
  clearChat,
  sendMessage,
  readMessage,
  deleteChat,
} = require("../controllers/ChatController.js");
const jwtCookieAuth = require("../middlewares/jwtCookieAuth.js");

const router = express.Router();

router.get("/all", jwtCookieAuth, getChats);
router.get("/:id", jwtCookieAuth, getChat);
router.put("/clear", jwtCookieAuth, clearChat);
router.patch("/sendMessage", jwtCookieAuth, sendMessage);
router.patch("/readMessage", jwtCookieAuth, readMessage);
router.delete("/delete/:id", jwtCookieAuth, deleteChat);

module.exports = router;
