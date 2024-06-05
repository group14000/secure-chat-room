const FriendRequest = require("../models/friendRequest");

exports.sendFriendRequest = async (req, res) => {
  const { toUserId } = req.body;
  const friendRequest = new FriendRequest({
    fromUserId: req.user.userId,
    toUserId,
    status: "pending",
  });

  await friendRequest.save();
  res.send(friendRequest);
};
