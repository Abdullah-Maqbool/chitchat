const express = require("express");
const {
  register,
  login,
  fetchUser,
} = require("../controllers/AuthController.js");
const jwtCookieAuth = require("../middlewares/jwtCookieAuth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/fetchUser", jwtCookieAuth, fetchUser);

module.exports = router;
