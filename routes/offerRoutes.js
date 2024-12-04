const express = require("express");
const {
  updateOffer,
  getOffer,
  deleteOffer,
} = require("../controllers/offerController");
const router = express.Router();

// POST route to update the offer
router.post("/", updateOffer);

// GET route to retrieve the current offer
router.get("/", getOffer);

// DELETE route to delete the current offer
router.delete("/", deleteOffer);

module.exports = router;
