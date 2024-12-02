const express = require("express");
const { updateOffer, getOffer } = require("../controllers/offerController");
const router = express.Router();

// POST route to update the offer
router.post("/", updateOffer);

// GET route to retrieve the current offer
router.get("/", getOffer);

module.exports = router;