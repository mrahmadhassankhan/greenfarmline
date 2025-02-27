const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    level: { type: String, enum: ["info", "warn", "error"], required: true },
    message: { type: String, required: true },
    method: { type: String, required: true },
    url: { type: String, required: true },
    statusCode: { type: Number },
    ip: { type: String },
    headers: { type: Object },
    requestBody: { type: Object },
    responseBody: { type: Object },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userAgent: { type: String },
    stack: { type: String },
    responseTime: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
