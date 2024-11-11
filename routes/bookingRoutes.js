const express = require('express');
const {
  createBooking,
  getBookings,
  approveBooking,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking); // Create a new booking
router.get('/', getBookings); // Get all bookings
router.patch("/:id", updateBookingStatus); // PATCH - Update booking status by ID
router.put('/approve/:id', approveBooking); // Approve a booking
router.delete('/:id', deleteBooking); // Delete a booking

module.exports = router;
