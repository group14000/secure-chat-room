const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FriendRequest = sequelize.define("FriendRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fromUserId: { type: DataTypes.UUID, allowNull: false },
  toUserId: { type: DataTypes.UUID, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = FriendRequest;
