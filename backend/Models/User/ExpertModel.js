const mongoose = require("mongoose");
const expertSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, // Hash this in production
  qualification: { type: String, required: true },
  degree: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  expertise: { type: String, required: true },
  userType: { type: String, default: "expert", required: true },
});

const Expert = mongoose.model("Expert", expertSchema);
module.exports = Expert;
