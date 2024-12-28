const express = require("express");
const queryRouter = express.Router();
const {
  createPostQuery,
  getAllPostQueries,
  updatePostQuery,
  deletePostQuery,
  approverejectallqueries,
  approverejectSpecificQuery,
  getApprovedQueries,
  getPendingQueries,
  getRejectedQueries,
  getUserQueriesByEmail,
} = require("../Controllers/User/Query/QueryController");
const {
  queryImageUploadMiddleware,
} = require("../middlewares/ImageMiddleware");

// Define routes
queryRouter
  .route("/postquery")
  .post(queryImageUploadMiddleware, createPostQuery); // Create a new query
queryRouter.route("/getqueries").get(getAllPostQueries); // Get all queries
queryRouter.route("/getapprovedqueries").get(getApprovedQueries); // Get all Approved queries
queryRouter.route("/getpendingqueries").get(getPendingQueries); // Get all Pending queries
queryRouter.route("/getrejectedqueries").get(getRejectedQueries); // Get all Rejected queries
queryRouter.route("/getuserquery").get(getUserQueriesByEmail); // Get query by ID
queryRouter.route("/updatequery/:id").put(updatePostQuery); // Update query by ID
queryRouter.route("/deletequery/:id").delete(deletePostQuery); // Delete query by ID
queryRouter.route("/approverejectallqueries").put(approverejectallqueries); //Approve Reject All Queries
queryRouter.route("/approverejectquery/:id").put(approverejectSpecificQuery); // Apporve Reject Specific Query

module.exports = queryRouter;
