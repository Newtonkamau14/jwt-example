const { Op } = require("sequelize");
const { User } = require("../models/user.model");
const { otpGenerator } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Max age 3 days
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
        .render("signup",{
          title: "Signup",
          message: "Missing required fields in the form"
        })
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
      return res.status(400).json({ message: "User already exists" });
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
    res.status(201).redirect("/");
  } catch (error) {
    console.error("Error in creating user", error);
  }
};

const userlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
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
      return res.status(401).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }
    const token = createToken(user.userId);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/user/login");
};

const getSendOtpPage = (req, res) => {
  res.render("sendotp", {
    title: "Send OTP",
  });
};

const sendOtp = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
    }
  } catch (error) {}
};

const getChangePasswordPage = async (req, res) => {
  res.render("changepassword", {
    title: "Change Password",
  });
};

const changePassword = async (req, res) => {
  try {
    // Destructuring for clarity
    const { email, password, confirmpassword } = req.body;

    // Validate required fields
    if (!email || !password || !confirmpassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the user
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare raw password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check for password equality directly
    if (password === user.password) {
      return res
        .status(400)
        .json({ message: "New password cannot be same as old" });
    }

    // Hash the new password

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the password
    await User.update({ password: hashedPassword }, { where: { email } });
    const token = createToken(user.userId);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    // Redirect on success
    res.redirect("/");
  } catch (error) {
    console.error("Error in changing password:", error);
  }
};

const getDeleteAccountPage = (req, res) => {
  res.render("deleteaccount", {
    title: "Delete Account",
  });
};

/* Account can be deleted after 7 days and will not be restored */
const deleteAccount = (req, res) => {
  try {
    const token = req.cookies.jwt;

    jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
      if(err){
        res.render("deleteaccount", {
          title: "Delete Account",
        });
      }
      else{
        await User.destroy({
          where: {
            userId: decodedToken.userId
          }
        });
      }
    });
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/")

  } catch (error) {
      console.log("A problem was encoutered when deleting the account.Please try again later")
  }
};

module.exports = {
  getLoginPage,
  getSignUpPage,
  userSignUp,
  userlogin,
  logout,
  getChangePasswordPage,
  changePassword,
  getDeleteAccountPage,
  deleteAccount,
  getSendOtpPage,
  sendOtp,
};
