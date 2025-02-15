const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
//require("./dbConnect");
const jwt = require("jsonwebtoken");
app.get("/", (req, res) => {
  res.send("Welcome to Wasan World");
});

app.post("/login", (req, res) => {
  console.log(req.body);

  const loggedInUser = {
    name: "Wasan",
    email: "srini01@gmail.com",
    phone: "1234554321",
    password: "abcd1234",
  };
  const jwtToken = generateToken(loggedInUser);

  res.send({ msg: "Login Success", user: loggedInUser, token: jwtToken });
});

app.get("/protectedRoute", verifyJwtToken, (req, res) => {
  {
    res.send("You are authorized to access this route");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateToken(loggedInUser) {
  return jwt.sign({ loggedInUser }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}
function verifyJwtToken(req, res, next) {
  if (!req.header("authorization")) {
    return res.status(403).json({ message: "Authorization Denied" });
  }
  const jwtToken = req.header("authorization").split(" ")[1];

  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Token is not valid" });
  }
  // Get auth header value
}
