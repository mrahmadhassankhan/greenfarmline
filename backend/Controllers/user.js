const User = require("../Models/user");
const Order = require("../Models/order");
const Activity = require("../Models/Activity");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");

const secret = process.env.JWT_SECRET;

// Utility function to generate JWT
const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, secret, { expiresIn: "48h" });
};

// Register user
const register = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, role, ...extraFields } = req.body;

  if (!name || !email || !password || !role) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  // Check if file is uploaded for specific roles
  if (["seller", "expert"].includes(role) && !req.file) {
    return next(new errorHandler("Please upload a document", 400));
  }

  if (req.file) extraFields.document = req.file.path;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return next(new errorHandler("User already exists", 400));
  }

  const userData = { name, email, password, role, ...extraFields };
  const newUser = await User.create(userData);

  await Activity.create({ message: `New ${role} "${name}" registered` });

  const token = generateToken(newUser._id, newUser.email, newUser.role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: process.env.COOKIE_DOMAIN || ".greenfarmline.shop",
    maxAge: 48 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: `${
      role.charAt(0).toUpperCase() + role.slice(1)
    } Registered successfully`,
    user: { name: newUser.name, email: newUser.email, role: newUser.role },
    token,
  });
});

// Login user
const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const userExists = await User.findOne({ email });
  if (!userExists || userExists.role !== role) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  const isMatch = await userExists.comparePassword(password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  const token = generateToken(
    userExists._id,
    userExists.email,
    userExists.role
  );

  const cartSize = userExists.cart.items.reduce((a, p) => a + p.quantity, 0);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: process.env.COOKIE_DOMAIN || ".greenfarmline.shop",
    maxAge: 48 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
      cartSize,
    },
    token,
  });
});

// Verify user
const verifyUser = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new errorHandler("Token not found", 401));

  const { id } = jwt.verify(token, secret);
  const userObj = await User.findById(id);
  if (!userObj) {
    return next(new errorHandler("Invalid token", 401));
  }

  const cartSize = userObj.cart.items.reduce((a, p) => a + p.quantity, 0);
  res.status(200).json({
    success: true,
    user: { name: userObj.name, email: userObj.email, cartSize },
  });
});

// Fetch User Profile (Backend)
const getUserProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return next(new errorHandler("User not found", 404));

  res.status(200).json({ success: true, user });
});

// Update User Profile
const updateUserProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new errorHandler("User not found", 404));

  const {
    name,
    phoneNumber,
    address,
    businessName,
    registrationNo,
    qualification,
    yearsOfExperience,
    expertise,
  } = req.body;

  user.name = name || user.name;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.address = address || user.address;

  if (user.role === "seller") {
    user.businessName = businessName || user.businessName;
    user.registrationNo = registrationNo || user.registrationNo;
  }

  if (user.role === "expert") {
    user.qualification = qualification || user.qualification;
    user.yearsOfExperience = yearsOfExperience || user.yearsOfExperience;
    user.expertise = expertise || user.expertise;
  }

  await user.save();
  await Activity.create({
    message: `The ${user.role} ${name} updated account details`,
  });

  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully", user });
});

// Get Orders
const getOrder = asyncErrorHandler(async (req, res, next) => {
  const email = req.user.email;
  const orderObj = await Order.find({ "shipping.email": email }).populate({
    path: "products.productId",
    select: "name price brand image slug color",
  });

  if (!orderObj || orderObj.length === 0) {
    return res.status(200).json({ success: false, message: "No orders found" });
  }

  const formattedOrders = orderObj.map((order) => ({
    id: order._id,
    paymentId: order.paymentIntentId,
    totalPrice: order.total,
    delivered: order.delivery_status,
    createdAt: order.createdAt.toLocaleDateString(),
    items: order.products.map((item) => ({
      id: item.productId._id,
      name: `${item.productId.brand} ${item.productId.name}`,
      price: item.productId.price,
      image: item.productId.image,
      color: item.productId.color,
      slug: item.productId.slug,
      quantity: item.quantity,
      size: item.size,
      isReviewed: item.isReviewed,
    })),
  }));

  res.status(200).json({
    success: true,
    count: formattedOrders.length,
    orders: formattedOrders.reverse(),
  });
});

// Forget Password
const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) return next(new errorHandler("User not found", 404));

  const token = jwt.sign({ id: userExists._id }, secret + userExists.password, {
    expiresIn: "5m",
  });
  await sendEmail({
    email,
    subject: "Password Reset",
    message: `Reset your password: ${process.env.CLIENT_URL}/resetpassword?token=${token}&id=${userExists._id}`,
  });

  res.status(200).json({ success: true, message: "Password reset email sent" });
});

module.exports = {
  register,
  login,
  verifyUser,
  getOrder,
  forgetPassword,
  getUserProfile,
  updateUserProfile,
};
