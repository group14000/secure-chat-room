const io = require("../app").io;
const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  const { chatRoomId, content } = req.body;
  const message = new Message({
    chatRoomId,
    userId: req.user.userId,
    content,
  });

  await message.save();
  io.to(chatRoomId).emit("chat message", message);
  res.send(message);
};
