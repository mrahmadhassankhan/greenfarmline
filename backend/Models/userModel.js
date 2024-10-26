const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Farmer", "Seller", "Expert"],
    required: true,
  },
  businessName: {
    type: String,
    required: function () {
      return this.role === "Seller";
    }, // Required if role is Seller
  },
  registrationNo: {
    type: String,
    required: function () {
      return this.role === "Seller";
    }, // Required if role is Seller
  },
  businessLogo: {
    type: String,
    required: function () {
      return this.role === "Seller";
    }, // Required if role is Seller
  },
  qualification: {
    type: String,
    required: function () {
      return this.role === "Expert";
    }, // Required if role is Expert
  },
  uploadDegree: {
    type: String,
    required: function () {
      return this.role === "Expert";
    }, // Required if role is Expert
  },
  yearsOfExperience: {
    type: Number,
    required: function () {
      return this.role === "Expert";
    }, // Required if role is Expert
  },
  areaOfExpertise: {
    type: String,
    required: function () {
      return this.role === "Expert";
    }, // Required if role is Expert
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password matching method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model from the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
