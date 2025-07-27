// routes/signup.js

const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /api/signup
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    // Create new user (password is stored as plain text)
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();

    // Respond with success (do not send password)
    res.status(201).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
