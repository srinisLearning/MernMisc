const express = require("express");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const loggedInUser = {
    id: 1,
    username: "wasan",
    email: "srini15@gmail.com",
    phone: "9840098400",
    password: "123456",
  };

  /*  const token = jwt.sign(user, JWT_SECRET); 
   const jwtToken = await user.generateToken();
  console.log(jwtToken); */

  const jwtToken = generateToken(loggedInUser);
  // console.log(jwtToken);
  res.json({
    message: "Login Success",
    token: jwtToken,
    loggedInUser,
  });
};

const profile = async (req, res) => {
  res.json({
    message: `Welcome to Profile Page`,
  });
};

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

module.exports = { login, verifyJwtToken, profile };
