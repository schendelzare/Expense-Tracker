const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id, remarks, amount, transaction_type } = req.body;
  if (!transaction_id) throw "Transaction id is required!";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";

  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "Transaction type must be income or expense!";

  const getTransactions = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!getTransactions) throw "Transactions not found!";

  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      transaction_type,
      amount,
    },
    { runValidators: true }
  );

  res.status(200).json({
    status: "Success!",
    message: "Edit Successful!",
  });
};

module.exports = editTransaction;
