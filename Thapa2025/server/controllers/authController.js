var bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const home = async (req, res) => {
  try {
    res.status(200).send("Wasan Server Running");
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    const { userName, email, phone, password } = req.body;
    const newUser = await User.findOne({ email });
    if (newUser) {
      res.status(400).send("User already exists");
    }
    /*  const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);
 */
    const user = new User({
      userName,
      email,
      phone,
      //password: hashedPassword,
      password,
    });
    await user.save();
    // console.log(userName, email, phone, password);
    res.status(200).send({
      msg: "User Registered Sucessfully",
      user: user,
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedinUser = await User.findOne({ email });
    if (!loggedinUser) {
      res.status(400).send("Invalid Creditionals");
    }
    //const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    const doPasswordMatch = await loggedinUser.comparePassword(password);
    if (doPasswordMatch) {
      const jwtToken = await loggedinUser.generateToken();
      console.log(jwtToken);
      res.status(200).send({
        msg: "Login Sucessful",
        user: loggedinUser,
      });
    } else {
      res.status(400).send("Invalid Credintials Login Failed");
    }
  } catch (error) {
    console.log(error);

    res.status(400).send("Login Failed");
  }
};
/* const home = async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to Wasan World"
      );
  } catch (error) {
    console.log(error);
  }
}; */

module.exports = { home, register, login };
