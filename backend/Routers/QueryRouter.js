const express = require("express");
const queryRouter = express.Router();
const {
  createPostQuery,
  getAllPostQueries,
  getPostQueryById,
  updatePostQuery,
  deletePostQuery,
} = require("../Controllers/User/Query/QueryController");
const {
  queryImageUploadMiddleware,
} = require("../middlewares/ImageMiddleware");

// Define routes
queryRouter
  .route("/postquery")
  .post(queryImageUploadMiddleware, createPostQuery); // Create a new query
queryRouter.route("/getqueries").get(getAllPostQueries); // Get all queries
queryRouter.route("/getquery/:id").get(getPostQueryById); // Get query by ID
queryRouter.route("/updatequery/:id").put(updatePostQuery); // Update query by ID
queryRouter.route("/deletequery/:id").delete(deletePostQuery); // Delete query by ID

module.exports = queryRouter;
