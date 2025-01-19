const express = require("express");
const router = express.Router();
// const { register, login } = require("../Controllers/user");
const {
  addToCart,
  getCart,
  deleteCart,
  updateCart,
  cartSize,
} = require("../Controllers/cart");

router.route("/").get(getCart);
router.route("/add").post(addToCart);
router.route("/delete/:id").delete(deleteCart);
router.route("/update/:cartId").put(updateCart);
router.route("/cartSize").get(cartSize);

module.exports = router;
