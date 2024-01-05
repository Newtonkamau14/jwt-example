const { Op } = require("sequelize");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Max age
const maxAge = 3 * 24 * 60 * 60;

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const getSignUpPage = (req, res) => {
  res.render("signup", {
    title: "SignUp",
  });
};

const getLoginPage = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const userSignUp = async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the form" });
    }

    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      },
    });
    if (userExists) {
      return res.status(400).json({ message: "User exists" });
    }

    const saltRounds = 10;

    //method to ensure password is hashed before inserting to db
    User.addHook("beforeCreate", (user, options) => {
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    });

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const token = createToken(user.userId);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user.userId });
  } catch (error) {
    console.error("Error in creating user", error);
  }
};

const userlogin = async (req, res) => {
  try {

    const {username,password} = req.body
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the form" });
    }

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "user does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = createToken(user.userId);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user.userId });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {};

module.exports = {
  getLoginPage,
  getSignUpPage,
  userSignUp,
  userlogin,
  logout,
};
