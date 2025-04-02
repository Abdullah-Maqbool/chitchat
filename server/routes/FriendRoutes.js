const express = require("express");
const jwtCookieAuth = require("../middlewares/jwtCookieAuth.js");
const {
  getFriends,
  addFriend,
  removeFriend,
} = require("../controllers/FriendController.js");

const router = express.Router();

router.get("/", jwtCookieAuth, getFriends);
router.post("/", jwtCookieAuth, addFriend);
router.delete("/:id", jwtCookieAuth, removeFriend);

module.exports = router;
