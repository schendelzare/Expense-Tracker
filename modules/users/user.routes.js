const express = require("express");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotpassword");
const login = require("./controllers/login");

const register = require("./controllers/register");
const resetPassword = require("./controllers/resetPassword");
const userDashboard = require("./controllers/userDashboard");

const userRoutes = express.Router();

//Routes...
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);

userRoutes.use(auth); //auth middleware

userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
