const AsyncHandler = require("express-async-handler");
const ExpertModel = require("../../Models/User/ExpertModel");
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

    // Handle file upload
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Degree is required. Kindly Attached" });
    }

    const degree = req.file.filename;

    // Create new seller
    const newExpert = await ExpertModel.create({
      fullName,
      email,
      phoneNumber,
      address,
      password, // Hash this password before saving in production
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
    console.error("Error creating seller:", error);
    res
      .status(500)
      .json({ message: "Error Creating Expert", error: error.message });
  }
});

module.exports = { ExpertRegisterController };
