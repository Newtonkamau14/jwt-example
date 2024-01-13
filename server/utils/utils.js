const nodemailer = require("nodemailer");
const { Otp } = require("../models/otp.model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    PASS: process.env.APPPASSWORD,
  },
});

const otpGenerator = async (email) => {
  try {
    // declare all characters
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let randomString = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    const otp = await Otp.create({
      email: email,
      otp: randomString,
    });

    const option = {
      from: process.env.EMAIL,
      to: email,
      subject: `One Time Password`,
      text: `This is the One Time Password ${otp}.It will expire after being used`,
    };

    await transporter.sendMail(option, function (error, info) {
      if (error) {
        response.redirect("");
      } else {
        response.redirect("/");
      }
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

module.exports = { otpGenerator };
