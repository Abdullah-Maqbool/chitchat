const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/EmailOTPController.js");

const router = express.Router();

router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
