const Offer = require("../models/Offer");

// Update or create offer
exports.updateOffer = async (req, res) => {
  const { dishName, description, price, startDate, endDate } = req.body;

  // Validate required fields
  if (!dishName || !price || !startDate || !endDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let offer = await Offer.findOne();
    if (offer) {
      // Update existing offer
      offer.dishName = dishName;
      offer.description = description;
      offer.price = price;
      offer.startDate = startDate;
      offer.endDate = endDate;
    } else {
      // Create a new offer
      offer = new Offer({ dishName, description, price, startDate, endDate });
    }

    await offer.save();
    res.json({ message: "Offer updated successfully", offer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get current offer
exports.getOffer = async (req, res) => {
  try {
    const offer = await Offer.findOne();
    if (!offer) {
      return res.status(404).json({ message: "No offer available" });
    }
    res.json({ offer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete current offer
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findOne();
    if (!offer) {
      return res.status(404).json({ message: "No offer available to delete" });
    }

    await Offer.deleteOne({ _id: offer._id });
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
