const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const friendRequestController = require("../controllers/friendRequestController");

router.post(
  "/friend-requests",
  auth,
  friendRequestController.sendFriendRequest
);

module.exports = router;
