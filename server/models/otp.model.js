const { sequelize } = require("../config/database");
const { DataTypes} = require('sequelize')

const Otp = sequelize.define(
  "OTP",
  {
    otpId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        len: [6, 6],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
    },
    isEntered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Otp.beforeSync(() => {
  console.log("before creating OTP table");
});

Otp.afterSync(() => {
  console.log("after creating OTP table");
});

module.exports = { Otp}
