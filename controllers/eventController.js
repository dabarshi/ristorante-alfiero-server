// controllers/eventController.js
const Event = require("../models/Event");

// Create a new event reservation
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Error creating event reservation", error });
  }
};

// Get all event reservations
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event reservations", error });
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

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Error updating event reservation", error });
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
    res.status(500).json({ message: "Error deleting event reservation", error });
  }
};




