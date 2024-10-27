const AsyncHandler = require("express-async-handler");
const FarmerModel = require("../../Models/User/FarmerModel");

const FarmerRegisterController = AsyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, address, password } = req.body;

  try {
    // Check for existing user
    const user = await FarmerModel.findOne({ email }); // Use await here
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Create new farmer
    const newFarmer = await FarmerModel.create({
      fullName,
      email,
      phoneNumber,
      address,
      password, // Ensure to hash this password before saving in production
    });

    res
      .status(201)
      .json({ message: "Farmer Successfully Added", farmer: newFarmer });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error Creating Farmer", error: error.message });
  }
});

module.exports = { FarmerRegisterController };
