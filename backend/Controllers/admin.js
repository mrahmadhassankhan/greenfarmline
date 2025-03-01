const user = require("../Models/user");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const order = require("../Models/order");
const product = require("../Models/product");
const Activity = require("../Models/Activity");
const Stripe = require("stripe");
const brands = require("../Models/brands");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, secret, { expiresIn: "48h" });
};

const adminLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const userExists = await user.findOne({ email });
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

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: process.env.COOKIE_DOMAIN || ".greenfarmline.shop",
    maxAge: 48 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
    },
    token,
  });
});

const getAllUsers = asyncErrorHandler(async (req, res) => {
  // Fetch all users and select required fields
  const users = await user.find().select("name email createdAt role");

  // Filter users to get only sellers
  const sellers = users.filter((user) => user.role === "seller");

  // Get total counts
  const totalUsers = users.length;
  const totalSellers = sellers.length;

  // Format users with indexed and formatted date
  const usersWithFormattedDate = users.map((user, index) => ({
    ...user._doc,
    createdAt: new Date(user.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    index: `#${(index + 1)
      .toString()
      .padStart(totalUsers.toString().length, "0")}`,
  }));

  res.status(200).json({
    success: true,
    count: totalUsers, // Total users count
    sellersCount: totalSellers, // Sellers count
    users: usersWithFormattedDate, // Users list
  });
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Get the latest 5 activities
const getRecentActivities = asyncErrorHandler(async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllOrders = asyncErrorHandler(async (req, res, next) => {
  // Extract email from query parameters
  const { email } = req.query;

  // Check if email is provided
  if (!email) return next(new errorHandler("Email not provided", 400));

  // Find orders based on the provided email
  const orderObj = await order.find({ "shipping.email": email }).populate({
    path: "products.productId",
    select: "name price brand slug", // Ensure these fields are present
  });

  // Check if orders exist for the provided email
  if (!orderObj || orderObj.length === 0) {
    return res.status(200).json({
      success: false,
      message: "No orders found for the provided email",
    });
  }

  // Format the orders to include necessary fields
  const formattedOrders = orderObj.map((order) => {
    return {
      _id: order._id,
      paymentId: order.paymentIntentId,
      name: order.shipping.name,
      totalPrice: order.total,
      delivered: order.delivery_status,
      createdAt: order.createdAt.toLocaleDateString(), // Format date
      items: order.products.map((item) => {
        return {
          _id: item._id,
          price: item.price,
          image: item.image,
          slug: item.slug,
          quantity: item.quantity,
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

const getAllOrdersAdmin = asyncErrorHandler(async (req, res, next) => {
  const orderObj = await order.find().populate({
    path: "products.productId",
    select: "name price brand slug",
  });

  if (!orderObj || orderObj.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No orders found",
    });
  }

  const formattedOrders = orderObj.map((order) => {
    return {
      _id: order._id,
      paymentId: order.paymentIntentId,
      name: order.shipping.name,
      email: order.shipping.email,
      totalPrice: order.total,
      delivered: order.delivery_status,
      createdAt: order.createdAt.toLocaleDateString(),
      items: order.products.map((item) => {
        return {
          _id: item._id,
          quantity: item.quantity,
          isReviewed: item.isReviewed,
          price: item.price,
          image: item.image,
          slug: item.productId?.slug || "N/A",
          product: {
            name: item.productId?.name || "Unknown Product",
            brand: item.productId?.brand || "Unknown Brand",
          },
        };
      }),
    };
  });

  res.status(200).json({
    success: true,
    count: formattedOrders.length,
    orders: formattedOrders.reverse(),
  });
});

const updateOrderStatus = asyncErrorHandler(async (req, res) => {
  const { id, status, paymentId } = req.body;
  await order.findByIdAndUpdate(id, { delivery_status: status });
  if (status === "Cancelled") {
    await stripe.refunds.create({ payment_intent: paymentId });
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully.",
  });
});

const getCoupons = asyncErrorHandler(async (req, res) => {
  const coupons = await stripe.coupons.list({
    limit: 100,
  });
  data = coupons.data.map((coupon) => ({
    id: coupon.id,
    percent_off: coupon.percent_off,
    duration:
      coupon.duration == "repeating"
        ? coupon.duration_in_months
        : coupon.duration,
    duration_in_months: coupon.duration_in_months,
    max_redemptions: coupon.max_redemptions || 999,
    redemption_left: `${coupon.times_redeemed}/${
      coupon.max_redemptions || "∞"
    }`,
  }));

  res.status(200).json({
    success: true,
    data,
  });
});

const createCoupon = asyncErrorHandler(async (req, res) => {
  const {
    name,
    discount: percent_off,
    duration,
    duration_in_months,
    max_redemptions,
  } = req.body.formData;
  const couponData = {
    id: name.toUpperCase(),
    name: name.toUpperCase(),
    duration: duration === "forever" ? "forever" : "repeating",
    percent_off,
    max_redemptions,
  };

  if (duration !== "forever") {
    couponData.duration_in_months = duration_in_months;
  }

  await stripe.coupons.create(couponData);
  res.status(200).json({
    success: true,
    message: "Coupon created successfully.",
  });
});

const deleteCoupon = asyncErrorHandler(async (req, res) => {
  await stripe.coupons.del(req.params.id);
  res.status(200).json({
    success: true,
    message: "Coupon deleted successfully.",
  });
});

const getAllProducts = asyncErrorHandler(async (req, res) => {
  const { page, limit, searchTerm } = req.query;
  const products = await product
    .find({ name: { $regex: searchTerm, $options: "i" } })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort("brand name");

  const count = await product.countDocuments({
    name: { $regex: searchTerm, $options: "i" },
  });

  const formattedList = products.map((product) => ({
    _id: product._id,
    document: product.document,
    name: product.name,
    description: `${(product.ratingScore / product.ratings.length || 0).toFixed(
      1
    )} Stars Rating`,
    size: product.quantity,
    brand: product.brand,
    status: product.isActive ? "Active" : "Inactive",
    price: product.price,
    slug: product.slug,
  }));
  res.status(200).json({
    success: true,
    count,
    products: formattedList,
  });
});

const productStatus = asyncErrorHandler(async (req, res) => {
  const currentProduct = await product.findById(req.params.id);
  const productBrand = await brands.findOne({ name: currentProduct.brand });
  productBrand.activeProducts += currentProduct.isActive ? -1 : 1;
  currentProduct.isActive = !currentProduct.isActive;
  await currentProduct.save();
  await productBrand.save();
  res.status(200).json({
    success: true,
    message: "Product status updated successfully.",
  });
});

const getAdminDetails = asyncErrorHandler(async (req, res) => {
  const label1 = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data1 = [];
  const label2 = ["Pending", "Delivered", "Cancelled"];
  const data2 = [];
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );
  const ordersData = await order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalSales: { $sum: "$total" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  Array.from({ length: 12 }, (_, i) => {
    const monthData = ordersData.find((data) => data._id === i + 1);
    if (monthData) {
      data1.push(Number(monthData.totalSales).toFixed(2));
    } else {
      data1.push(0);
    }
  });

  const orderUpdate = await order.aggregate([
    {
      $match: {
        createdAt: {
          $gt: firstDayOfMonth,
          $lte: firstDayOfNextMonth,
        },
      },
    },
    {
      $group: {
        _id: "$delivery_status",
        count: { $sum: 1 },
      },
    },
  ]);

  label2.forEach((status) => {
    const matchingOrderUpdate = orderUpdate.find(
      (data) => data._id.toLowerCase() === status.toLowerCase()
    );

    if (matchingOrderUpdate) {
      data2.push(matchingOrderUpdate.count);
    } else {
      data2.push(0);
    }
  });
  const totalUsers = await user.countDocuments({ role: "farmer" });
  const totalOrders = await order.countDocuments();
  const totalProducts = await product.countDocuments();
  const totalSales = await order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bar1: { labels: label1, data: data1 },
    bar2: { labels: label2, data: data2 },
    totalUsers,
    totalOrders,
    totalProducts,
    totalSales: totalSales.length > 0 ? totalSales[0].total.toFixed(2) : "0.00",
  });
});
module.exports = {
  adminLogin,
  getAllUsers,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  productStatus,
  getAdminDetails,
  deleteUser,
  getRecentActivities,
  getAllOrdersAdmin,
};
