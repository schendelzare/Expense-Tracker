const mongoose = require("mongoose");
const brcypt = require("bcrypt");

const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required!";
  if (!new_password) throw "Please provide new password!";
  if (!reset_code) throw "Reset code is required!";
  if (new_password.length < 5)
    throw "Password must be at least 5 characters long!";

  const getUserWithResetCode = await userModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code does not match!";

  const hashedPassword = await brcypt.hash(new_password, 12);

  await userModel.updateOne(
    { email: email },
    {
      password: hashedPassword,
      reset_code: "",
    },
    { runValidators: true }
  );

  const text = "Password successfully updated!";
  const subject = "Password RESET Succesful!";
  await emailManager(email, text, text, subject);

  res.status(200).json({
    status: "Success!",
    message: "Password reset successfully!",
  });
};

module.exports = resetPassword;
