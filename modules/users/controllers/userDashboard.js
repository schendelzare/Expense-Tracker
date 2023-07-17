const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password"); //exclude the properties that is selected

  const transactions = await transactionModel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5); //limit how many data will show

  res.status(200).json({
    status: "user dashboard",
    data: getUser,
    transactions,
  });
};

module.exports = userDashboard;
