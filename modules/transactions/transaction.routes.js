const express = require("express");

const auth = require("../../middleware/auth");
const addExpense = require("./controllers/addExpense");
const addIncome = require("./controllers/addIncome");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");
const getTransactions = require("./controllers/getTransactions");

const transactionRoutes = express.Router();

//Routes...

transactionRoutes.use(auth); //auth middleware //for verification

//Protected Routes

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addexpense", addExpense);
transactionRoutes.get("/", getTransactions);

transactionRoutes.delete("/:transaction_id", deleteTransaction);
transactionRoutes.patch("/", editTransaction);

module.exports = transactionRoutes;
