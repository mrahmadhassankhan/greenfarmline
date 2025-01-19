const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
} = require("../Controllers/category");
const { deleteCategory } = require("../Controllers/category");
const router = express.Router();

router.route("/").get(getCategory).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

module.exports = router;
