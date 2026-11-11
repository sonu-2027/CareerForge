const Contact = require("../models/Contact");

// @route POST /api/contact  (public)
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: "Thanks! We'll get back to you soon." });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

module.exports = { submitContact };
