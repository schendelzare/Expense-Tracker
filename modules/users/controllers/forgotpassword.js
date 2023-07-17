const mongoose = require("mongoose");
const usersModel = require("../../../models/users.model");

const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email is required!";

  const getUser = await userModel.findOne({
    email: email,
  });
  if (!getUser) throw "This email does not exist in the system!";

  const reset_code = Math.floor(10000 + Math.random() * 9000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: reset_code,
    },
    {
      runValidators: true,
    }
  );

  //node mailer

  const text = "Your password reset code is " + reset_code;
  const subject = "Reset your Password!";

  await emailManager(email, text, text, subject);

  res.status(200).json({
    status: "Reset code sent to email succesfully!",
  });
};

module.exports = forgotPassword;
