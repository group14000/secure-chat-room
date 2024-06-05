const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { userId, deviceId, name, phone, availCoins, password } = req.body;

    let user = await User.findOne({ where: { phone } });
    if (user) {
      console.log(`User with phone ${phone} already exists`);
      return res.status(400).send("User already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      userId,
      deviceId,
      name,
      phone,
      availCoins,
      password: hashedPassword,
    });

    await user.save();
    console.log("User registered successfully:", user);

    const token = jwt.sign({ userId: user.userId }, "jwtPrivateKey");
    res.send({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal server error");
  }
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ where: { phone } });
  if (!user) return res.status(400).send("Invalid phone or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid phone or password.");

  const token = jwt.sign({ userId: user.userId }, "jwtPrivateKey");
  res.send({ token });
};

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) return res.status(404).send("User not found.");
  res.send(user);
};
