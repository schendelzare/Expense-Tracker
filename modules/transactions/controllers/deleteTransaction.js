const mongoose = require("mongoose");
const validator = require("validator");
const usersModel = require("../../../models/users.model");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";

  const getTransactions = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransactions) throw "Transactions not found!";

  if (getTransactions.transaction_type === "income") {
    await usersModel.updateOne(
      {
        _id: getTransactions.user_id,
      },
      {
        $inc: {
          balance: getTransactions.amount * -1,
        },
      },
      { runValidators: true }
    );
  } else {
    await usersModel.updateOne(
      {
        _id: getTransactions.user_id,
      },
      {
        $inc: {
          balance: getTransactions.amount * 1,
        },
      },
      { runValidators: true }
    );
  }

  await transactionModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Success!",
    message: "Delete transaction successfully!",
  });
};

module.exports = deleteTransaction;
