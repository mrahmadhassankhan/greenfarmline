const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const farmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, default: "farmer", required: true },
});

farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

farmerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
