const express = require("express");
const jwtCookieAuth = require("../middlewares/jwtCookieAuth.js");
const {
  getRequests,
  sendRequest,
  deleteRequest,
} = require("../controllers/RequestController.js");

const router = express.Router();

router.get("/", jwtCookieAuth, getRequests);
router.post("/", jwtCookieAuth, sendRequest);
router.delete("/:id", jwtCookieAuth, deleteRequest);

module.exports = router;
