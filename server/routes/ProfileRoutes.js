const express = require("express");
const jwtCookieAuth = require("../middlewares/jwtCookieAuth.js");
const {
  getProfile,
  updateProfile,
} = require("../controllers/ProfileController.js");

const router = express.Router();

router.get("/", jwtCookieAuth, getProfile);
router.patch("/", jwtCookieAuth, updateProfile);

module.exports = router;
