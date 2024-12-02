const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occasion: { type: String },
  email: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  menuRequirements: { type: String },
  date: { type: String, required: true }, // Store date as a string in ISO format (e.g., "YYYY-MM-DD")
  time: { type: String, required: true }, // Store time as a string in "HH:mm" format
  contactInfo: { type: String, required: true },
  specialRequirements: { type: String },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
});

module.exports = mongoose.model("Event", eventSchema);
