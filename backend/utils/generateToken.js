const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Set the environment variable.");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
