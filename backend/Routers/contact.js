const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const Contact = require("../Models/Contact");

const contactUsRouter = express.Router();

// Rate Limiting: Prevent excessive submissions
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { error: "Too many requests, please try again later." },
});

// @desc  Submit Contact Form
// @route POST /api/contact
// @access Public
contactUsRouter.post(
  "/contactForm",
  limiter,
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name is required."),
    body("email").isEmail().normalizeEmail().withMessage("Invalid email."),
    body("phone")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid phone number."),
    body("subject").trim().notEmpty().withMessage("Subject is required."),
    body("message")
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage("Message must be 10-500 characters."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      let { name, email, phone, subject, message } = req.body;

      name = sanitizeHtml(name);
      email = sanitizeHtml(email);
      phone = sanitizeHtml(phone || "");
      subject = sanitizeHtml(subject);
      message = sanitizeHtml(message);

      const contactEntry = new Contact({
        name,
        email,
        phone,
        subject,
        message,
      });
      await contactEntry.save();

      res
        .status(201)
        .json({ success: true, message: "Your query has been submitted!" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = contactUsRouter;
