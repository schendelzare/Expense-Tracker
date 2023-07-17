const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");

  console.log(req.query);
  //sample...
  //http://localhost:8000/api/transactions?transaction_type=income
  //http://localhost:8000/api/transactions?transaction_type=income&amount=10
  const transactions = await transactionsModel.find({
    user_id: req.user._id,
    ...req.query,
  });

  res.status(200).json({
    status: "Success!",
    data: transactions,
  });
};

module.exports = getTransactions;
