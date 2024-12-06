const SpecialOffer = require("../models/SpecialOffer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get the current offer image
exports.getSpecialOffer = async (req, res) => {
  try {
    const offer = await SpecialOffer.findOne();
    if (!offer) {
      console.log("No Image");
      return res.status(404).json({ message: "No offer image found" });
    }
    res.json({ imageUrl: offer.imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Upload a new offer image
exports.uploadSpecialOffer = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    if (!file) {
      console.log("no upload");
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        })
        .end(file.buffer);
    });

    // Find and delete the existing offer image
    const existingOffer = await SpecialOffer.findOne();
    if (existingOffer) {
      await cloudinary.uploader.destroy(existingOffer.cloudinaryId);
      await existingOffer.deleteOne();
    }

    // Save new offer
    const newOffer = await SpecialOffer.create({
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.json({ imageUrl: newOffer.imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete the offer image
exports.deleteSpecialOffer = async (req, res) => {
  try {
    const offer = await SpecialOffer.findOne();
    if (!offer)
      return res.status(404).json({ message: "No offer image found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(offer.cloudinaryId);
    await offer.deleteOne();

    res.json({ message: "Special offer image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
