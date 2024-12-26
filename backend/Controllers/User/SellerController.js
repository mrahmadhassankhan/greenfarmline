const AsyncHandler = require("express-async-handler");
const SellerModel = require("../../Models/User/SellerModel");

// Seller Register Controller
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

// Seller Login Controller
const SellerLoginController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the seller exists
    const seller = await SellerModel.findOne({ email });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await seller.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        userName: seller.fullName,
        userEmail: seller.email,
        userType: "seller",
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error Logging In", error: error.message });
  }
});

module.exports = { SellerRegisterController, SellerLoginController };
