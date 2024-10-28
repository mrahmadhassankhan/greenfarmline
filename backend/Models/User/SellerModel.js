const mongoose = require("mongoose");
const sellerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, // Hash this in production
  businessName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  businessLogo: { type: String, required: true }, // You might want to store the path or URL
  userType: { type: String, default: "seller", required: true },
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
