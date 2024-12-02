const Booking = require("../models/Booking");
const sendEmail = require("../utils/email");
require("dotenv").config();
// Create a new table booking
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);

    // Notify the admin
    const subject = "New Booking Request";
    const text = `A new booking has been requested:\n\n
    Name: ${newBooking.name}\n
    Time: ${newBooking.time}\n
    Date: ${newBooking.date}\n
    Person: ${newBooking.person}\n
    Phone: ${newBooking.phone}\n
    Email: ${newBooking.email}\n
    Message: ${newBooking.message}`;

    await sendEmail(process.env.ADMIN_EMAIL, subject, text);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Notify the user
    const subject = "Booking Request Approved";
    const text = `Dear ${updatedBooking.name},\n\n
                  Thank you for choosing Ristorante Alfiero! We’re delighted to confirm your table booking for ${updatedBooking.person} persons   on ${updatedBooking.date} at ${updatedBooking.time}.\n

                  We look forward to hosting you and ensuring a delightful experience. If you need to make any changes to your reservation,   please contact us at +39-06-85357856.\n\n
  
                  Warm regards,\n
                  Ristorante Alfiero\n
                  Via Servio Tullio, 9, 00187 Roma\n
                  +39-06-85357856\n
                  `;

    await sendEmail(updatedBooking.email, subject, text);

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
