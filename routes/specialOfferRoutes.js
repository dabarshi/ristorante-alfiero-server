const express = require("express");
const multer = require("multer");
const {
  getSpecialOffer,
  uploadSpecialOffer,
  deleteSpecialOffer,
} = require("../controllers/specialOfferController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getSpecialOffer);
router.post("/upload", upload.single("image"), uploadSpecialOffer);
router.delete("/delete", deleteSpecialOffer);

module.exports = router;
