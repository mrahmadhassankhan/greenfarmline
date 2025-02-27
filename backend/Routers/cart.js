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
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
router.use(authMiddleware);
router.route("/getcart").get(roleMiddleware(["farmer", "seller", "expert"]), getCart);
router
  .route("/add")
  .post(roleMiddleware(["farmer", "seller", "expert"]), addToCart);
router
  .route("/delete/:id")
  .delete(roleMiddleware(["farmer", "seller", "expert"]), deleteCart);
router
  .route("/update/:cartId")
  .put(roleMiddleware(["farmer", "seller", "expert"]), updateCart);
router
  .route("/cartSize")
  .get(roleMiddleware(["farmer", "seller", "expert"]), cartSize);

module.exports = router;
