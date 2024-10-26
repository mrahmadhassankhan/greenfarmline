const User = require("../Models/userModel"); // Imported the User Model
const asynchandler = require("express-async-handler"); // For Error Handling
const generateToken = require("../utils/generateToken");

const Register = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const Login = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or  Passoword");
  }
});

module.exports = { Login, Register };
