const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
} = require("../Controllers/category");
const { deleteCategory } = require("../Controllers/category");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");
const router = express.Router();
router.use(authMiddleware);
router
  .route("/addCategory")
  .get(roleMiddleware(["farmer", "seller", "expert"]), getCategory)
  .post(roleMiddleware(["seller"]), createCategory);
router
  .route("/:id")
  .put(roleMiddleware(["seller"]), updateCategory)
  .delete(roleMiddleware(["seller", "admin"]), deleteCategory);

module.exports = router;
