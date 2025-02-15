const express = require("express");
const app = express();
const port = process.env.PORT || 6066;
const router = express.Router();
const dbConnect = require("./dbConnect");

require("dotenv").config();
app.use(express.json());

const authRoutes = require("./routes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  //console.log("Server is Running");
  res.send("Wasan Server Running");
});

dbConnect.connection.on("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
dbConnect.connection.on("error", (err) => {
  console.log("Error Connectiong to MongoDB", err);
});
