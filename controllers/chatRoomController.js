const ChatRoom = require("../models/chatroom");
const User = require("../models/user");

exports.createChatRoom = async (req, res) => {
  const { name, password } = req.body;
  const chatRoom = new ChatRoom({
    name,
    password: await bcrypt.hash(password, 10),
    createdBy: req.user.userId,
  });

  await chatRoom.save();
  res.send(chatRoom);
};

exports.joinChatRoom = async (req, res) => {
  const { roomId, password } = req.body;
  const chatRoom = await ChatRoom.findByPk(roomId);
  if (!chatRoom) return res.status(404).send("Chat room not found.");

  const isPasswordValid = await bcrypt.compare(password, chatRoom.password);
  if (!isPasswordValid) return res.status(400).send("Invalid room password.");

  // Add more logic to check user capacity and coins for non-prime members

  res.send("Joined successfully");
};
