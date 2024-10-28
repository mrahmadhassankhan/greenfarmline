const express = require("express");
const categoriesrouter = express.Router();
const {
  postCategory,
  getCategories,
  deleteCategory,
} = require("../Controllers/Admin/CategoryController");

const { categoryUploadMiddleware } = require("../middlewares/ImageMiddleware");
//Category Routes
categoriesrouter
  .route("/postcategory")
  .post(categoryUploadMiddleware, postCategory);
categoriesrouter.route("/getcategory").get(getCategories);
categoriesrouter.route("/deletecategory/:categoryId").delete(deleteCategory);

module.exports = categoriesrouter;
