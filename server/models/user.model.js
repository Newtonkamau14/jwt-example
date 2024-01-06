const { sequelize } = require("../config/database");
const { DataTypes, UUID } = require("sequelize");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isLowercase: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

/* User.beforeSync(() => {
  console.log("before creating user table");
});

User.afterSync(() => {
  console.log("after creating user table");
}); */

module.exports = { User };
