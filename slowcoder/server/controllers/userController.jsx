const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = new User({ name, email, password, phone });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
