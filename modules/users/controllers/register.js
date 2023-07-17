const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwtManager = require("../../../managers/jwtManager");

const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  const getDuplicate = await userModel.findOne({
    email: email,
  });

  //Validations...
  if (!email) throw "Email is required!";
  if (!password) throw "Password is required!";
  if (password.length < 5) throw "Password must be 5 characters long!";

  if (confirm_password !== password)
    throw "Password and confirm password does not match";

  if (getDuplicate) throw "This email already exist!";

  const hashedPassword = await bcrypt.hash(password, 12); // to encrypt password

  const createdUser = await userModel.create({
    full_name: name,
    email,
    password: hashedPassword, // to encrypt password
    balance,
  });

  const accessToken = jwtManager(createdUser);

  //node mailer
  const text =
    "Welcome to expense tracker PRO. We hope we can manage your expenses";
  const subject = "Welcome to expense Tracker PRO!";

  await emailManager(createdUser.email, text, text, subject);

  res.status(200).json({
    status: "Success!",
    message: "Account Created!",
    accessToken: accessToken,
  });
};

module.exports = register;
