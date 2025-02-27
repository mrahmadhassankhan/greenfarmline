const jwt = require("jsonwebtoken"); //
const User = require("../Models/user");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token found!");
    return res.status(401).json({ message: "Token not found" });
  }

  console.log("Received Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
