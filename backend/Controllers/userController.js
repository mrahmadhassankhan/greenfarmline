const User = require("../Models/userModel"); // Imported the User Model
const asyncHandler = require("express-async-handler"); // For Error Handling
const generateToken = require("../utils/generateToken");

const Register = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    address,
    password,
    role,
    businessName,
    registrationNo,
    businessLogo,
    qualification,
    uploadDegree,
    yearsOfExperience,
    areaOfExpertise,
  } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // Create the user object based on role
  const userData = {
    fullName,
    email,
    phoneNumber,
    address,
    password,
    role,
  };

  // Add Seller specific fields if role is Seller
  if (role === "Seller") {
    userData.businessName = businessName;
    userData.registrationNo = registrationNo;
    userData.businessLogo = businessLogo;
  }

  // Add Expert specific fields if role is Expert
  if (role === "Expert") {
    userData.qualification = qualification;
    userData.uploadDegree = uploadDegree;
    userData.yearsOfExperience = yearsOfExperience;
    userData.areaOfExpertise = areaOfExpertise;
  }

  // Create the user
  const user = await User.create(userData);

  if (user) {
    res.status(201).json({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred!");
  }
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { Login, Register };
