const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  image: {
    type: String, // URL of the image
    default: null,
  },
  role: {
    type: String,
    required: true,
    enum: ["farmer", "expert", "seller"],
  },
});

const QueryModel = mongoose.model("Queries", QuerySchema);
module.exports = QueryModel;
