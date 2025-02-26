const express = require("express");
const { checkout } = require("../Controllers/payments");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
const router = express.Router();
router.use(authMiddleware);
router
  .route("/create-checkout-session")
  .post(roleMiddleware(["farmer", "seller", "expert"]), checkout);

module.exports = router;
