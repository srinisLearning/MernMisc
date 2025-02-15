const mongoose = require("mongoose");
require("dotenv").config();
//const mongoUrl =   "mongodb+srv://wasan:abdc4213@cluster0.vwd2bmc.mongodb.net/WasanHotels";
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
const connection = mongoose.connection;
/* connection.on("open", () => {
  console.log("Connected to MongoDB");
});
connection.on("error", (err) => {
  console.log("Error Connectiong to MongoDB", err);
}); */
module.exports = mongoose;

/* 
const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;






*/
