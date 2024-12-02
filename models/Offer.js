const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  startDate: { type: String, required: true }, // Use String to store formatted dates like "01 Jan"
  endDate: { type: String, required: true },   // Use String to store formatted dates like "31 Dec"
});

module.exports = mongoose.model("Offer", offerSchema);
