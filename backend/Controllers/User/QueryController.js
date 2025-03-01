const QueryModel = require("../../Models/User/Query/QueryModel");
const Activity = require("../../Models/Activity");

const createPostQuery = async (req, res) => {
  try {
    const { title, description, name, email, image, role } = req.body;

    // Validate required fields
    if (!title || !description || !name || !email || !role) {
      return res
        .status(400)
        .json({ error: "All fields, including role, are required." });
    }

    // Validate role
    if (!["farmer", "expert", "seller"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role. Must be farmer, expert, or seller." });
    }

    const document = req.file.filename;
    const newPostQuery = new QueryModel({
      title,
      description,
      name,
      email,
      image: document,
      role,
    });

    const savedPostQuery = await newPostQuery.save();
    res.status(201).json(savedPostQuery);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post query." });
  }
};
// Get all post queries
const getAllPostQueries = async (req, res) => {
  try {
    const postQueries = await QueryModel.find();
    if (postQueries.length === 0) {
      return res
        .status(200)
        .json({ message: "No post queries found", data: [] });
    }
    res.status(200).json({ data: postQueries });
  } catch (error) {
    console.error("Error fetching post queries:", error.message);
    res.status(500).json({ error: "Failed to fetch post queries." });
  }
};

const getPendingQueries = async (req, res) => {
  try {
    const pendingQueries = await QueryModel.find({ status: "Pending" });
    res.status(200).json({
      data: pendingQueries.length > 0 ? pendingQueries : [],
      message:
        pendingQueries.length > 0
          ? "Pending queries retrieved"
          : "No pending queries found",
    });
  } catch (error) {
    console.error("Error fetching pending queries:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRejectedQueries = async (req, res) => {
  try {
    const rejectedQueries = await QueryModel.find({ status: "Rejected" });
    res.status(200).json({
      data: rejectedQueries.length > 0 ? rejectedQueries : [],
      message:
        rejectedQueries.length > 0
          ? "Rejected queries retrieved"
          : "No rejected queries found",
    });
  } catch (error) {
    console.error("Error fetching rejected queries:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route to get only approved queries
const getApprovedQueries = async (req, res) => {
  try {

    const approvedQueries = await QueryModel.find({
      status: "Approved",
    }).exec();

    if (!approvedQueries || approvedQueries.length === 0) {
      return res
        .status(200)
        .json({ message: "No approved queries found", data: [] });
    }

    return res.status(200).json({ data: approvedQueries });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || "Unknown error occurred",
    });
  }
};

// Route to get all queries from a specific user based on email
const getUserQueriesByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email parameter is required" });
  }

  try {
    const userQueries = await QueryModel.find({ email });
    res
      .status(200)
      .json(
        userQueries.length > 0
          ? { data: userQueries }
          : { message: "No queries found for this user", data: [] }
      );
  } catch (error) {
    console.error("Error fetching user queries:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a post query
const updatePostQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedPostQuery = await QueryModel.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updates against the schema
    });

    if (!updatedPostQuery) {
      return res.status(404).json({ error: "Post query not found." });
    }

    res.status(200).json(updatedPostQuery);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the post query." });
  }
};

// Delete a post query
const deletePostQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPostQuery = await QueryModel.findByIdAndDelete(id);

    if (!deletedPostQuery) {
      return res.status(404).json({ error: "Post query not found." });
    }

    res.status(200).json({ message: "Post query deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the post query." });
  }
};
const approverejectallqueries = async (req, res) => {
  const { status } = req.body; // 'Approved' or 'Rejected'

  if (!status || !["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // Check if there are any pending queries before updating
    const pendingQueries = await QueryModel.countDocuments({
      status: "Pending",
    });

    if (pendingQueries.length === 0) {
      return res.status(200).json({ message: "No pending queries to update" });
    }

    const result = await QueryModel.updateMany(
      { status: "Pending" },
      { $set: { status } }
    );

    res
      .status(200)
      .json({ message: `All pending queries marked as ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating queries" });
  }
};

// Endpoint to approve or reject a specific query (optional, individual status change)
const approverejectSpecificQuery = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const query = await QueryModel.findById(id);

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    query.status = status; // Update the status
    await query.save(); // Save the changes
    await Activity.create({ message: `Admin ${status} query ID ${id}` });
    res.status(200).json({ message: `Query status updated to ${status}` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while updating query status" });
  }
};

module.exports = {
  createPostQuery,
  getAllPostQueries,
  getApprovedQueries,
  getRejectedQueries,
  getPendingQueries,
  getUserQueriesByEmail,
  updatePostQuery,
  deletePostQuery,
  approverejectSpecificQuery,
  approverejectallqueries,
};
