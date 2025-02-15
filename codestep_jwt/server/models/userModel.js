const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.error(error);
  }
};

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
