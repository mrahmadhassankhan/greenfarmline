const AsyncHandler = require("express-async-handler");
const SellerModel = require("../../Models/User/SellerModel");
const SellerRegisterController = AsyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    address,
    password,
    businessName,
    registrationNo,
    userType,
  } = req.body;

  try {
    // Check for existing user
    const user = await SellerModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Handle file upload
    if (!req.file) {
      return res.status(400).json({ message: "Business logo is required" });
    }

    const businessLogo = req.file.filename;

    // Create new seller
    const newSeller = await SellerModel.create({
      fullName,
      email,
      phoneNumber,
      address,
      password, // Hash this password before saving in production
      businessName,
      registrationNo,
      businessLogo,
      userType,
    });

    res
      .status(201)
      .json({ message: "Seller Successfully Added", seller: newSeller });
  } catch (error) {
    console.error("Error creating seller:", error);
    res
      .status(500)
      .json({ message: "Error Creating Seller", error: error.message });
  }
});

module.exports = { SellerRegisterController };
