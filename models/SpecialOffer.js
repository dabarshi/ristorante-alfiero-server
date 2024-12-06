const mongoose = require("mongoose");

const SpecialOfferSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
});

module.exports = mongoose.model("SpecialOffer", SpecialOfferSchema);
