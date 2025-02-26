const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[\d\s()+-]{10,15}$/.test(value);
        },
        message: "Invalid phone number format",
      },
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
