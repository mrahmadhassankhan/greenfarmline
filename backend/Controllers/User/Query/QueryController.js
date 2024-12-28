const QueryModel = require("../../../Models/User/Query/QueryModel");

const createPostQuery = async (req, res) => {
  try {
    const { title, description, username, email, image, role } = req.body;

    // Validate required fields
    if (!title || !description || !username || !email || !role) {
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

    const queryimage = req.file.filename;
    const newPostQuery = new QueryModel({
      title,
      description,
      username,
      email,
      image: queryimage,
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

// Get a single post query by ID
const getPostQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const postQuery = await QueryModel.findById(id);

    if (!postQuery) {
      return res.status(404).json({ error: "Post query not found." });
    }

    res.status(200).json(postQuery);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the post query." });
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

module.exports = {
  createPostQuery,
  getAllPostQueries,
  getPostQueryById,
  updatePostQuery,
  deletePostQuery,
};
