const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, // Hash this in production
  userType: { type: String, default: "farmer", required: true },
});

const Farmer = mongoose.model("Farmer", farmerSchema);
module.exports = Farmer;
