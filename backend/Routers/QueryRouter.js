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
} = require("../Controllers/User/QueryController");
const { UploadingFileMiddleware } = require("../middlewares/ImageMiddleware");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

queryRouter
  .route("/getapprovedqueries")
  .get(getApprovedQueries);

queryRouter.use(authMiddleware);

// Define routes
queryRouter
  .route("/postquery")
  .post(roleMiddleware(["farmer"]), UploadingFileMiddleware, createPostQuery); // Create a new query
queryRouter
  .route("/getpendingqueries")
  .get(roleMiddleware(["admin", "farmer"]), getPendingQueries); // Get all Pending queries
queryRouter
  .route("/getrejectedqueries")
  .get(roleMiddleware(["farmer", "admin"]), getRejectedQueries); // Get all Rejected queries
queryRouter
  .route("/getuserquery")
  .get(roleMiddleware(["farmer", "expert", "admin"]), getUserQueriesByEmail); // Get query by ID
queryRouter
  .route("updatequery/:id")
  .put(roleMiddleware(["admin"]), updatePostQuery); // Update query by ID
queryRouter
  .route("deletequery/:id")
  .delete(roleMiddleware(["admin", "farmer"]), deletePostQuery); // Delete query by ID
queryRouter
  .route("/approverejectallqueries")
  .put(roleMiddleware(["admin"]), approverejectallqueries); //Approve Reject All Queries
queryRouter
  .route("/approverejectquery/:id")
  .put(roleMiddleware(["admin"]), approverejectSpecificQuery); // Apporve Reject Specific Query

module.exports = queryRouter;
