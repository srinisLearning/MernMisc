const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema([
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  /*   {
    timestamps: true,
  }, */
]);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const saltRound = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRound);
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString, email: this.email, isAdmin: this.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
