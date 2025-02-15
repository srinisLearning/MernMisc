const express = require("express");
const router = express.Router();

const authController = require("./controllers/authController");

const authRoutes = express.Router();
authRoutes.get("/", authController.home);
authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);

module.exports = authRoutes;
