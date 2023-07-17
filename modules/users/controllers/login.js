const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;
  //Get user...
  const userAvailable = await userModel.findOne({
    email: email,
  });
  //Compare if the password match
  const comparePassword = await bcrypt.compare(
    password,
    userAvailable.password
  );

  if (!userAvailable) throw "No user found!";
  if (!comparePassword) throw "Wrong password!";

  // Generate access TOKEN... jwt manager
  const accessToken = jwtManager(userAvailable);

  res.status(200).json({
    status: "Success",
    message: "User logged in successfully!",
    accessToken: accessToken,
  });
};

module.exports = login;
