const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

// Open the connection to MySQL server
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    /* dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      }
    } */
  },
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDb();


module.exports = { sequelize };



