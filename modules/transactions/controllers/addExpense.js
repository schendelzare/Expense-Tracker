const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  //Validations ...

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Remarks is required!";
  if (remarks < 5) throw "Remarks must be 5 characters long!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number!";

  if (amount < 0) throw "Amount must not be negative!";

  await transactionsModel.create({
    user_id: req.user._id,
    amount,
    remarks,
    transaction_type: "expense",
  });

  await userModel.updateOne(
    {
      _id: req.user._id, //user id of object
    },
    {
      $inc: {
        balance: amount * -1, //decrement data by amount e.a. balance - amount
      },
    },
    {
      runValidators: true, //important
    }
  );

  res.status(200).json({
    status: "Success!",
    message: "Expense deducuted succesfully!",
  });
};

module.exports = addExpense;
