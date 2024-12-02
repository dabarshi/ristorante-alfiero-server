const Contact = require("../models/Contact");
const sendEmail = require('../utils/email');
require('dotenv').config();

// @desc Submit a contact form
// @route POST /api/contact
// @access Public
const submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    // Create a new contact document in the database
    const contact = new Contact({ name, email, phone, message });
    await contact.save();

        // Notify the admin
        const subject = 'A new message from Alfiero ristorane';
        const text = `You got a SMS from ${contact.name}:\n\n
        Email: ${contact.email}\n
        Phone: ${contact.phone}\n
        Message: ${contact.message}`;
    
        await sendEmail(process.env.ADMIN_EMAIL, subject, text);


    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error.message);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
};

module.exports = { submitContactForm };
