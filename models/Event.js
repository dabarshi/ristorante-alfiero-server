// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  menuRequirements: { type: String },
  dateTime: { type: Date, required: true },
  contactInfo: { type: String, required: true },
  occasion: { type: String },
  specialRequirements: { type: String },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
});

module.exports = mongoose.model("Event", eventSchema);
