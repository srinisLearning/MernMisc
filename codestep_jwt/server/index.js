const express = require("express");

const app = express();
require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());

const cors = require("cors");
app.use(cors());
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
  res.send("Welcome to Wasan World");
});

const userRouter = require("./routes");
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
