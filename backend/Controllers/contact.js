const Contact = require("../Models/Contact");

// @desc  Submit Contact Form
// @route POST /api/contact
// @access Public
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled!" });
    }

    const contactEntry = new Contact({ name, email, phone, subject, message });
    await contactEntry.save();

    res
      .status(201)
      .json({ success: true, message: "Your query has been submitted!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
