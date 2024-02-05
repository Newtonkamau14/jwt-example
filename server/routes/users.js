const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireAuth, limiter } = require("../middleware/middleware");

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

router
  .route("/changepassword")
  .get(requireAuth, userController.getChangePasswordPage)
  .post(requireAuth, userController.changePassword);

router
  .route("/deleteaccount")
  .get(requireAuth, userController.getDeleteAccountPage)
  .post(requireAuth, userController.deleteAccount);

router
  .route("/sendotp")
  .get(requireAuth, userController.getSendOtpPage)
  .post(requireAuth,limiter, userController.sendOtp);

router
  .route("/confirmotp")
  .get(userController.getConfirmOtpPage)
  .post(userController.confirmOtp);

module.exports = router;
