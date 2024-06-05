const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const messageController = require("../controllers/messageController");

router.post("/messages", auth, messageController.sendMessage);

module.exports = router;
