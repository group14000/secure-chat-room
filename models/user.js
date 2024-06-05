const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  deviceId: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  availCoins: { type: DataTypes.INTEGER, defaultValue: 0 },
  password: { type: DataTypes.STRING, allowNull: false },
  isPrime: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
