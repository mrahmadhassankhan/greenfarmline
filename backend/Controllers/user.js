const User = require("../Models/user");
const Order = require("../Models/order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const order = require("../Models/order");
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
  // Check if file is uploaded
  if (role === "seller" || role === "expert") {
    if (!req.file) {
      return next(new errorHandler("Please upload a document", 400));
    }
    extraFields.document = req.file.path;
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return next(new errorHandler("Email already exists", 400));
  }

  const userData = { name, email, password, role, ...extraFields };

  const newUser = await User.create(userData);

  res.status(201).json({
    success: true,
    message: `${
      role.charAt(0).toUpperCase() + role.slice(1)
    } registered successfully`,
    user: {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// Login user
const login = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
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
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
    sameSite: "Strict", // Protects against CSRF
    maxAge: 48 * 60 * 60 * 1000, // 48 hours in milliseconds
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
    user: {
      name: userObj.name,
      email: userObj.email,
      cartSize,
    },
  });
});

// Fetch User Profile
const getUserProfile = asyncErrorHandler(async (req, res, next) => {
  // DEBUGGING..
  console.log("User Profile API Called");
  console.log("Authenticated User:", req.user);
  
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({ success: true, user });
});

// Update User Profile
const updateUserProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  const { name, phoneNumber, address, businessName, registrationNo, qualification, yearsOfExperience, expertise } = req.body;

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
  res.status(200).json({ success: true, message: "Profile updated successfully", user });
});

const getOrder = asyncErrorHandler(async (req, res, next) => {
  // Extract email from query parameters
  const { email } = req.query;
  console.log(email);
  // Check if email is provided
  if (!email) return next(new errorHandler("Email not provided", 400));

  // Find orders based on the provided email
  const orderObj = await order.find({ "shipping.email": email }).populate({
    path: "products.productId",
    select: "name price brand image slug color",
  });

  console.log("Orders found:", orderObj); // Debugging

  // Check if orders exist for the provided email
  if (!orderObj || orderObj.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No orders found for the provided email",
    });
  }

  // Format the orders
  const formattedOrders = orderObj.map((order) => {
    return {
      id: order._id,
      paymentId: order.paymentIntentId,
      totalPrice: order.total,
      delivered: order.delivery_status,
      createdAt: order.createdAt.toLocaleDateString(), // Format date
      items: order.products.map((item) => {
        return {
          id: item.productId._id,
          name: `${item.productId.brand} ${item.productId.name}`,
          price: item.productId.price,
          image: item.productId.image,
          color: item.productId.color,
          slug: item.productId.slug,
          quantity: item.quantity,
          size: item.size,
          isReviewed: item.isReviewed,
        };
      }),
    };
  });

  // Return the formatted orders with correct count
  res.status(200).json({
    success: true,
    count: formattedOrders.length, // Ensure the count reflects the number of orders
    orders: formattedOrders.reverse(), // Reverse to show the latest orders first
  });
});

// Forget password
const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.params;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return next(new errorHandler("User not found", 404));
  }

  const token = jwt.sign({ id: userExists._id }, secret + userExists.password, {
    expiresIn: "5m",
  });
  const resetUrl = `${process.env.CLIENT_URL}/resetpassword?token=${token}&id=${userExists._id}`;

  await sendEmail({
    email,
    subject: "Password Reset Request for Your Account",
    message: `
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });

  res.status(200).json({
    success: true,
    message: "Password reset email sent successfully",
  });
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
