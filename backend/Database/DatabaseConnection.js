const mongoose = require("mongoose");

const dbURI = "mongodb://127.0.0.1:27017/greenfarmline";
mongoose.connect(dbURI);
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongoose connected`);
});

db.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = db;
