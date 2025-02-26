const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getFilterOptions,
  getProduct,
  updateReview,
  updateProduct,
  getFeaturedProducts,
} = require("../Controllers/product");
const { getOptions } = require("../Controllers/brands");
const { UploadingFileMiddleware } = require("../middlewares/ImageMiddleware");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

router.use(authMiddleware);
// Create product route with image upload middleware
router
  .route("/create")
  .post(roleMiddleware(["seller"]), UploadingFileMiddleware, createProduct);

// Update product route with image upload middleware
router
  .route("/update/:slug")
  .put(roleMiddleware(["seller"]), UploadingFileMiddleware, updateProduct);

// Filter products route (search, pagination, sorting, etc.)
router.route("/filter").get(getProducts);

// Get filter options for categories, colors, and brands
router
  .route("/filterOptions")
  .get(roleMiddleware(["seller", "farmer", "expert"]), getFilterOptions);

// Get product options (brands, categories, etc.)
router
  .route("/options")
  .get(roleMiddleware(["seller", "farmer", "expert"]), getOptions);

// Get a single product by its slug
router.route("/:slug").get(getProduct);

// Update a review
router
  .route("/review")
  .put(roleMiddleware(["seller", "farmer", "expert"]), updateReview);

// Items showing in shop
router.route("/featured").get(getFeaturedProducts);

module.exports = router;
