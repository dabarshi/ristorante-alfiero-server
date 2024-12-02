// controllers/eventController.js
const Event = require("../models/Event");
const sendEmail = require("../utils/email");
require("dotenv").config();

// Create a new event reservation
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    // Notify the admin
    const subject = "New Event Booking Request";
    const text = `A new event booking has been requested:\n\n
        Name: ${event.name}\n
        Occasion: ${event.occasion}\n
        Email: ${event.email}\n
        Person: ${event.numberOfPeople}\n
        Menu Requirements: ${event.menuRequirements}\n
        Date: ${event.date}\n
        Time: ${event.time}\n
        ContactInfo: ${event.contactInfo}\n
        Special Requirements: ${event.specialRequirements}`;

    await sendEmail(process.env.ADMIN_EMAIL, subject, text);

    res.status(201).json(event);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating event reservation", error });
  }
};

// Get all event reservations
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event reservations", error });
  }
};

// Update an event reservation status to 'approved'
exports.updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event reservation not found" });
    }

    // Notify the user
    const subject = "Event Booking Request Approved";
    const text = `Dear ${event.name},\n\n
        Thank you for booking your event at Ristorante Alfiero! This is to confirm your reservation for ${event.occasion} on ${event.date} at ${event.time}.\n
        We are excited to host your event and ensure everything runs smoothly. If you have specific requirements or wish to make changes, feel free to contact us at +39-06-85357856.\n\n
        Best regards,\n
        Ristorante Alfiero\n
        Via Servio Tullio, 9, 00187 Roma\n
        +39-06-85357856`;

    await sendEmail(event.email, subject, text);

    res.json(event);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating event reservation", error });
  }
};

// Delete an event reservation
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event reservation not found" });
    }

    res.json({ message: "Event reservation deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event reservation", error });
  }
};
