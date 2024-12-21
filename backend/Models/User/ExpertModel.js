const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const expertSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  qualification: { type: String, required: true },
  degree: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  expertise: { type: String, required: true },
  userType: { type: String, default: "expert", required: true },
});

expertSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

expertSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Expert = mongoose.model("Expert", expertSchema);

module.exports = Expert;
