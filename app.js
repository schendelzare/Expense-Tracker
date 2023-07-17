require("express-async-errors");

const express = require("express"); //main
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose"); //db
const cors = require("cors");

require("dotenv").config(); //access to env file for secure password

const userRoutes = require("./modules/users/user.routes");
const transactionRoutes = require("./modules/transactions/transaction.routes");

const app = express();
app.use(cors());

// db connection

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Mongo connection succesful!");
  })
  .catch(() => {
    console.log("Mongo connectio failed!");
  });

//Models initialization...

require("./models/users.model");
require("./models/transactions.model");

app.use(express.json());

//Routes...
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// End of all routes...
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Not Found!",
  });
});
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully!");
});
