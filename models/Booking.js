
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  time: String,
  date: String,
  person: Number,
  phone: String,
  email: String,
  message: String,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);