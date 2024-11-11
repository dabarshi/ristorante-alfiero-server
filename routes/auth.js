// routes/auth.js
const express = require("express");
const router = express.Router();
const { loginUser, registerUser, verifyToken } = require("../controllers/authController");

// POST /register route to handle registration
router.post("/register", registerUser);

// POST /login route to handle login
router.post("/login", loginUser);
router.get("/verify-token", verifyToken);

module.exports = router;
