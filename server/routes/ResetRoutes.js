const express = require("express");
const {
  resetOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/ResetController.js");

const router = express.Router();

router.post("/resetOTP", resetOTP);
router.post("/verifyOTP", verifyOTP);
router.patch("/", resetPassword);

module.exports = router;
