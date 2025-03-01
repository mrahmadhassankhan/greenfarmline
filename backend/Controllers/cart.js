const user = require("../Models/user");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const Product = require("../Models/product");
const mongoose = require("mongoose");
const getCart = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.query;
  const userObj = await user.findOne({ email }).populate({
    path: "cart.items.productId",
    select: "name price brand image slug",
  });
  if (!userObj) {
    return next(new errorHandler("Invalid User Cannot get cart", 401));
  }
  return res.status(200).json(userObj.cart);
});

const addToCart = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, productId, quantity } = req.body;

  // Ensure quantity is a valid number and greater than 0
  const parsedQuantity = parseInt(quantity, 10); // Casting to number
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return next(new errorHandler("Invalid quantity value", 400));
  }

  // Find the user by email
  const userObj = await user.findOne({ email });

  if (!userObj) {
    return next(new errorHandler("Login First, No User Found", 401));
  }

  // Find the product by productId
  const productObj = await Product.findById(productId).select("price quantity");

  if (!productObj) {
    return next(new errorHandler("Invalid Product ID", 404));
  }

  // Ensure the quantity does not exceed available product stock
  if (parsedQuantity > productObj.quantity) {
    return next(new errorHandler("Not enough stock available", 400));
  }

  // Find existing item in the user's cart
  const existingItem = userObj.cart.items.find(
    (item) => String(item.productId) === String(productId)
  );

  if (existingItem) {
    // If the item already exists, update the quantity
    existingItem.quantity += parsedQuantity;
  } else {
    // If it's a new item, add it to the cart
    userObj.cart.items.push({ productId, quantity: parsedQuantity });
  }

  // Update total price in the cart
  userObj.cart.totalPrice += productObj.price * parsedQuantity;

  // Save the updated user cart
  await userObj.save();

  // After updating the cart:
  console.log("Updated Cart:", userObj.cart);

  return res.status(200).json({
    message: "Product added to cart successfully",
  });
});

const deleteCart = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.query;
  const itemId = req.params.id;
  // console.log(itemId);
  const userObj = await user.findOne({ email }).populate({
    path: "cart.items.productId",
    select: "name price brand image slug",
  });

  if (!userObj) {
    return next(new errorHandler("Invalid User Delete Cart", 401));
  }

  const itemToRemove = userObj.cart.items.find(
    (item) => String(item._id) === String(itemId)
  );
  // console.log(itemToRemove);

  if (!itemToRemove) {
    return next(new errorHandler("Item not found in cart", 404));
  }

  userObj.cart.totalPrice -=
    itemToRemove.productId.price * itemToRemove.quantity;

  userObj.cart.items = userObj.cart.items.filter(
    (item) => String(item._id) !== String(itemId)
  );

  await userObj.save();
  return res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
    cart: userObj.cart,
  });
});

const updateCart = asyncErrorHandler(async (req, res, next) => {
  console.log("updateCart", req.body);
  console.log("updateCart", req.params);
  const { cartId } = req.params;
  const { quantity } = req.body;
  const { email } = req.query;
  const userObj = await user.findOne(email).populate({
    path: "cart.items.productId",
    select: "name price brand image slug",
  });

  if (!userObj) {
    return next(new errorHandler("Invalid User Update Cart", 401));
  }

  const itemToUpdate = userObj.cart.items.id(cartId);
  if (!itemToUpdate) {
    return next(new errorHandler("Item not found in cart", 404));
  }
  if (itemToUpdate.quantity === quantity) {
    return res.status(200).json({ message: "Cart updated successfully" });
  }
  const productPrice = await Product.findById(itemToUpdate.productId).select(
    "price"
  );
  if (!productPrice) {
    return next(new errorHandler("Invalid Product id", 404));
  }

  if (quantity <= 0) {
    userObj.cart.totalPrice -= itemToUpdate.quantity * productPrice.price;
    userObj.cart.items = userObj.cart.items.filter(
      (item) => String(item._id) !== String(cartId)
    );
  } else {
    userObj.cart.totalPrice -= itemToUpdate.quantity * productPrice.price;
    itemToUpdate.quantity = quantity;
    userObj.cart.totalPrice += itemToUpdate.quantity * productPrice.price;
  }

  await userObj.save();

  return res.status(200).json({
    message: "Product added to cart successfully",
    cart: userObj.cart,
  });
});

const cartSize = asyncErrorHandler(async (req, res, next) => {
  try {
    const id = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userObj = await user.findOne({ _id: id });

    if (!userObj) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get cart size safely
    const cartSize = userObj.cart?.items?.length || 0;

    return res.status(200).json({ cartSize });
  } catch (error) {
    next(error);
  }
});

module.exports = { addToCart, getCart, deleteCart, updateCart, cartSize };
