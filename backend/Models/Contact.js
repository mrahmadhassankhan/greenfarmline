const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: { type: String, trim: true, match: /^[0-9]{10,15}$/ },
    subject: { type: String, required: true, trim: true },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
