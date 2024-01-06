const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //   check if jwt exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/user/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/user/login");
  }
};

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.redirect("/user/login");
        res.locals.user = null;
      } else {
        let user = await User.findByPk(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } 
  else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
