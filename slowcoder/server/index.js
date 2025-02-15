const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");
app.get("/", (req, res) => {
  res.send("Welcome to Wasan World");
});
const userRoutes = require("./routes");
app.use("/api/user", userRoutes);

dbConnect.connection.on("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
dbConnect.connection.on("error", (err) => {
  console.log("Error Connectiong to MongoDB", err);
});
