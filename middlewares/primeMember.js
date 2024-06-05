const User = require("../models/user");

module.exports = async function (req, res, next) {
  const user = await User.findByPk(req.user.userId);
  if (!user.isPrime)
    return res.status(403).send("Access denied. Not a prime member.");
  next();
};
