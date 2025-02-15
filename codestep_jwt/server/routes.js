const express = require("express");
const userController = require("./controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.get(
  "/profile",
  userController.verifyJwtToken,
  userController.profile
);

module.exports = [userRouter];
