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
    res.status(200).json(postQueries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post queries." });
  }
};
// Route to get only pending queries
const getPendingQueries = async (req, res) => {
  try {
    // Fetch only pending queries
    const pendingQueries = await QueryModel.find({ status: "Pending" });
    res.status(200).json(pendingQueries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pending queries" });
  }
};

// Route to get only rejected queries
const getRejectedQueries = async (req, res) => {
  try {
    // Fetch only pending queries
    const rejectedQueries = await QueryModel.find({ status: "Rejected" });
    res.status(200).json(rejectedQueries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Rejected queries" });
  }
};

// Route to get only Approved queries
const getApprovedQueries = async (req, res) => {
  try {
    // Fetch only pending queries
    const approvedQueries = await QueryModel.find({ status: "Approved" });
    res.status(200).json(approvedQueries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching Approved queries" });
  }
};

// Route to get all queries from a specific user based on email
const getUserQueriesByEmail = async (req, res) => {
  const { email } = req.query; // Access the email parameter
  try {
    const userQueries = await QueryModel.find({ email });
    res.status(200).json(userQueries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching queries." });
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

// Endpoint to approve all queries
const approverejectallqueries = async (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'

  if (!status || !["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // Update all queries with status 'Pending' to the new status
    const result = await QueryModel.updateMany(
      { status: "Pending" },
      { $set: { status } }
    );

    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ message: `All queries have been marked as ${status}` });
    } else {
      res.status(400).json({ message: "No pending queries found to update" });
    }
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
