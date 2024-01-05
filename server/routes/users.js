const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router
  .route("/signup")
  .get(userController.getSignUpPage)
  .post(userController.userSignUp);

router
  .route("/login")
  .get(userController.getLoginPage)
  .post(userController.userlogin);

router.route("/logout").get(userController.logout);

module.exports = router;
