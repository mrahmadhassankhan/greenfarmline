const express = require("express");
const {
  getAllBrands,
  createBrand,
  updateBrand,
} = require("../Controllers/brands");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
const router = express.Router();
router.use(authMiddleware);

router
  .route("/")
  .get(roleMiddleware(["seller"]), getAllBrands)
  .post(roleMiddleware(["seller"]), createBrand);
router.route("/:id").put(roleMiddleware(["seller"]), updateBrand);

module.exports = router;
