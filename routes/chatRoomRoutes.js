const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const primeMember = require("../middlewares/primeMember");
const chatRoomController = require("../controllers/chatRoomController");

router.post(
  "/chatrooms",
  [auth, primeMember],
  chatRoomController.createChatRoom
);
router.post("/joinroom", auth, chatRoomController.joinChatRoom);

module.exports = router;
