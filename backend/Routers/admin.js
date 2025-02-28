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
  getAllOrdersAdmin,
} = require("../Controllers/admin");

const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const router = express.Router();

router.route("/adminLogin").post(adminLogin);
router.use(authMiddleware);

router.route("/users").get(roleMiddleware(["admin"]), getAllUsers);
router
  .route("/order")
  .get(roleMiddleware(["admin"]), getAllOrdersAdmin)
  .put(roleMiddleware(["seller"]), updateOrderStatus);
router.route("/orders").get(roleMiddleware(["admin", "farmer"]), getAllOrders);
router
  .route("/coupons")
  .get(roleMiddleware(["admin"]), getCoupons)
  .post(roleMiddleware(["admin"]), createCoupon);
router.route("/coupons/:id").delete(roleMiddleware(["admin"]), deleteCoupon);
router
  .route("/products")
  .get(roleMiddleware(["admin", "seller"]), getAllProducts);
router.route("/product/:id").put(roleMiddleware(["admin"]), productStatus);
router.route("/info").get(roleMiddleware(["admin"]), getAdminDetails);
router.route("/user/:id").delete(roleMiddleware(["admin"]), deleteUser);
router
  .route("/recent-activities")
  .get(roleMiddleware(["admin"]), getRecentActivities);

module.exports = router;
