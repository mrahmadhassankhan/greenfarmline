const product = require("../Models/product");
const user = require("../Models/user");
const order = require("../Models/order");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const brandsModel = require("../Models/brands");
const categoryModel = require("../Models/category");
const ProductModel = require("../Models/AdminModel/ProductModel");

// Get all products
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await product.find({});
  res.status(200).json({
    success: true,
    products,
  });
});

const getProducts = asyncErrorHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search || "";
  const sortParam = req.query.sortBy.value || "createdAt_asc";
  const brand = req.query.brand;
  const priceRange = req.query.price;
  const categoryOpt = req.query.category;

  const query = {
    name: { $regex: search, $options: "i" },
    price: {
      $gte: parseInt(priceRange.minPrice) || 0,
      $lte: parseInt(priceRange.maxPrice) || Infinity,
    },
    isActive: true,
  };

  if (brand && brand.length > 0) {
    query.brand = { $in: brand.map((brand) => brand) };
  }

  if (categoryOpt) {
    query.category = { $regex: categoryOpt, $options: "i" };
  }

  let sortField = "createdAt";
  let sortOrder = 1;

  if (sortParam) {
    const [field, order] = sortParam.split("_");
    if (field) {
      sortField = field;
    }
    if (order && order.toLowerCase() === "desc") {
      sortOrder = -1;
    }
  }

  const products = await product
    .find(query)
    .sort({ [sortField]: sortOrder })
    .skip(page * limit)
    .limit(limit);

  const brandOption = await brandsModel.find({}).select("name");
  const brandOptions = brandOption.map((brand) => brand.name);
  const categoryOption = await categoryModel.find({}).select("name");
  const categoryOptions = categoryOption.map((category) => category.name);
  const total = await product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: total,
    products,
    brandOptions,
    categoryOptions,
  });
});
// Get a single product by slug
const getProduct = asyncErrorHandler(async (req, res, next) => {
  const { slug } = req.params;

  const productExists = await product.findOne({ slug, isActive: true });
  if (!productExists) {
    return next(new errorHandler("No such product exist", 404));
  }

  return res.status(200).json({
    success: true,
    data: productExists,
  });
});

const createProduct = asyncErrorHandler(async (req, res, next) => {
  try {
    const {
      sku,
      name,
      brand,
      description,
      price,
      quantity, // Make sure quantity comes as a number or string
      category,
      featured,
    } = req.body;

    let document = req.body.document; // Avoid destructuring document here, because you're overwriting it

    if (!req.file && !document) {
      return next(
        new errorHandler(
          "Please upload a document or provide a URL for the document",
          400
        )
      );
    }

    // If a file is uploaded, use its path
    if (req.file) {
      document = req.file.path;
    }

    // Validate required fields
    if (
      !sku ||
      !name ||
      !brand ||
      !document ||
      !description ||
      !price ||
      !category ||
      !quantity
    ) {
      return next(new errorHandler("Please fill all fields", 400));
    }

    // Parse the quantity as an integer
    const parsedQuantity = parseInt(quantity, 10);

    // Check if quantity is a valid number and greater than 0
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return next(new errorHandler("Invalid quantity value", 400));
    }

    // Check if category exists
    const categoryExists = await categoryModel.findOne({ name: category });
    if (!categoryExists) {
      return res.status(404).json({ message: "Category does not exist" });
    }

    // Check if brand exists
    const productBrand = await brandsModel.findOne({ name: brand });
    if (!productBrand) {
      return next(new errorHandler("Brand does not exist", 404));
    }

    // Check if product already exists by SKU
    const productExists = await product.findOne({ sku });
    if (productExists) {
      return next(new errorHandler("Product already exists", 400));
    }

    // Create new product
    const newProduct = await product.create({
      sku,
      name,
      brand,
      document,
      description,
      price,
      quantity: parsedQuantity, // Store the parsed quantity here
      category,
      isFeatured: featured,
    });

    // Update product brand information
    if (productBrand) {
      productBrand.totalProducts += 1;
      productBrand.activeProducts += 1;
      await productBrand.save();
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    next(new errorHandler("Server Error", 500)); // Ensure proper error handling and message
  }
});

// Update a product
const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { slug } = req.params;
  const {
    sku,
    name,
    brand,
    description,
    price,
    quantity,
    featured,
    category,
  } = req.body;

  let document = req.body.document; // Avoid destructuring document here, because you're overwriting it

    if (!req.file && !document) {
      return next(
        new errorHandler(
          "Please upload a document or provide a URL for the document",
          400
        )
      );
    }

    // If a file is uploaded, use its path
    if (req.file) {
      document = req.file.path;
    }

  if (
    !sku ||
    !name ||
    !brand ||
    !document ||
    !description ||
    !price ||
    !quantity ||
    !category
  ) {
    return next(new errorHandler("Please fill all fields", 400));
  }

  const productExists = await product.findOne({ slug });
  if (!productExists) {
    return next(new errorHandler("Product does not exist", 404));
  }

  productExists.sku = sku;
  productExists.name = name;
  productExists.brand = brand;
  productExists.document = document;
  productExists.description = description;
  productExists.price = price;
  productExists.quantity = quantity;
  productExists.isFeatured = featured;
  productExists.category = category;

  await productExists.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

// Get filter options for brands, and categories
const getFilterOptions = asyncErrorHandler(async (req, res, next) => {
  const category = await categoryModel.find({}).select("name");
  const brands = await brandsModel.find({}).select("name");

  res.status(200).json({
    success: true,
    brands,
    category,
  });
});

const updateReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, review, productId, orderId } = req.body;
  const { email } = req.query;

  // Validate inputs
  if (!email) {
    return next(new errorHandler("Email is required", 400));
  }
  if (!productId || !orderId) {
    return next(new errorHandler("Product ID and Order ID are required", 400));
  }

  // Find the user by email
  const userObj = await user.findOne({ email });
  if (!userObj) {
    return next(new errorHandler("User not found", 404));
  }

  // Find the product
  const productObj = await product.findById(productId);
  if (!productObj) {
    return next(new errorHandler("Invalid Product ID", 404));
  }

  // Update product ratings
  productObj.ratings.push({ name: userObj.name, rating, review, date: Date.now() });
  productObj.ratingScore += rating;

  await productObj.save().catch(err => {
    console.error("Error Saving Product:", err);
  });

  // Find the order and update product status
  const orderObj = await order.findById(orderId);
  if (!orderObj) {
    return next(new errorHandler("Invalid Order ID", 404));
  }

  orderObj.products = orderObj.products.map((item) => {
    if (String(item.productId) === String(productId)) {
      item.isReviewed = true;
    }
    return item;
  });

  await orderObj.save().catch(err => {
    console.error("Error Saving Order:", err);
  });

  return res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

const getFeaturedProducts = asyncErrorHandler(async (req, res, next) => {
  console.log("called");
  const featured = await product
    .find({ isActive: true, isFeatured: true })
    .limit(8);
  const trending = await product
    .find({ isActive: true })
    .sort({ price: 1 })
    .limit(4);
  res.status(200).json({
    success: true,
    featured,
    trending,
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getFilterOptions,
  updateProduct,
  getAllProducts,
  updateReview,
  getFeaturedProducts,
};
