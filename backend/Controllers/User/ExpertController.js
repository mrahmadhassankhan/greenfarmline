const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ExpertModel = require("../../Models/User/ExpertModel");

// Expert Register Controller
const ExpertRegisterController = AsyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    address,
    password,
    qualification,
    yearsOfExperience,
    expertise,
    userType,
  } = req.body;

  try {
    // Check for existing user
    const user = await ExpertModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Handle file upload for degree
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Degree is required. Kindly Attach" });
    }

    const degree = req.file.filename;

    // Create new Expert
    const newExpert = await ExpertModel.create({
      fullName,
      email,
      phoneNumber,
      address,
      password, // Password will be hashed before saving
      qualification,
      degree,
      yearsOfExperience,
      expertise,
      userType,
    });

    res
      .status(201)
      .json({ message: "Expert Successfully Added", expert: newExpert });
  } catch (error) {
    console.error("Error creating expert:", error);
    res
      .status(500)
      .json({ message: "Error Creating Expert", error: error.message });
  }
});

// Expert Login Controller
const ExpertLoginController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const passwdStr = password.toString();
  try {
    // Check if the expert exists
    const expert = await ExpertModel.findOne({ email });
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(passwdStr, expert.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If login is successful, return expert details
    res.status(200).json({
      message: "Login successful",
      expert: {
        id: expert._id,
        fullName: expert.fullName,
        email: expert.email,
        phoneNumber: expert.phoneNumber,
        address: expert.address,
        qualification: expert.qualification,
        degree: expert.degree,
        yearsOfExperience: expert.yearsOfExperience,
        expertise: expert.expertise,
      },
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Error Logging In", error: error.message });
  }
});

module.exports = { ExpertRegisterController, ExpertLoginController };
