const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const FarmerModel = require("../../Models/User/FarmerModel");

const FarmerRegisterController = AsyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, address, password } = req.body;

  try {
    const user = await FarmerModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const newFarmer = await FarmerModel.create({
      fullName,
      email,
      phoneNumber,
      address,
      password,
    });

    res
      .status(201)
      .json({ message: "Farmer Successfully Added", farmer: newFarmer });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error Creating Farmer", error: error.message });
  }
});

const FarmerLoginController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const passwdstr = password.toString();
  try {
    const farmer = await FarmerModel.findOne({ email });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const passwordMatch = await bcrypt.compare(passwdstr, farmer.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      farmer: {
        id: farmer._id,
        fullName: farmer.fullName,
        email: farmer.email,
        phoneNumber: farmer.phoneNumber,
        address: farmer.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging In", error: error.message });
  }
});

module.exports = { FarmerRegisterController, FarmerLoginController };
