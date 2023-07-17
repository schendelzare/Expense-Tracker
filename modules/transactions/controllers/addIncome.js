const mongoose = require("mongoose");
const validator = require("validator");

const addIncome = async (req, res) => {
  const userModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  //Validations ...

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Remarks is required!";
  if (remarks < 5) throw "Remarks must be 5 characters long!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a valid number!";

  await transactionsModel.create({
    user_id: req.user._id,
    amount,
    remarks,
    transaction_type: "income",
  });

  await userModel.updateOne(
    {
      _id: req.user._id, //user id of object
    },
    {
      $inc: {
        balance: amount, //increment data by amount e.a. balance + amount
      },
    },
    {
      runValidators: true, //important
    }
  );

  res.status(200).json({
    status: "Success!",
    message: "Income added succesfully!",
  });
};

module.exports = addIncome;
