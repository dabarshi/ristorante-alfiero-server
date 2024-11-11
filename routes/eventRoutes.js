// routes/events.js
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  updateEventStatus,
  deleteEvent,
} = require("../controllers/eventController");

// Create a new event reservation
router.post("/", createEvent);

// Get all event reservations
router.get("/", getAllEvents);

// Update an event reservation status to 'approved'
router.patch("/:id", updateEventStatus);

// Delete an event reservation
router.delete("/:id", deleteEvent);

module.exports = router;
