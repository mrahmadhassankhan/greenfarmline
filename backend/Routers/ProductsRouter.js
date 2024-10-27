const express = require("express");
const productrouter = express.Router();
const {
  postproduct,
  getproduct,
  deleteproduct,
} = require("../Controllers/Admin/ProductController");

const { productUploadMiddleware } = require("../middlewares/ImageMiddleware");

//Product Routes
productrouter.route("/postproduct").post(productUploadMiddleware, postproduct);
productrouter.route("/getproduct").get(getproduct);
productrouter.route("/deleteproduct/:productId").delete(deleteproduct);

module.exports = productrouter;
