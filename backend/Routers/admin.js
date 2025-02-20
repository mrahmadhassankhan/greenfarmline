const express = require("express");
const {
  getAllUsers,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  productStatus,
  getAdminDetails,
  adminLogin,
  deleteUser,
  getRecentActivities,
} = require("../Controllers/admin");
const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.route("/users").get(getAllUsers);
router.route("/order").get(getAllOrders).put(updateOrderStatus);
router.route("/coupons").get(getCoupons).post(createCoupon);
router.route("/coupons/:id").delete(deleteCoupon);
router.route("/products").get(getAllProducts);
router.route("/product/:id").put(productStatus);
router.route("/info").get(getAdminDetails);
router.route("/user/:id").delete(deleteUser);
router.route("/recent-activities").get(getRecentActivities);

module.exports = router;
