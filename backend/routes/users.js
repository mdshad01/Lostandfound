const express = require("express");
const User = require("../models/User");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Don't return passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new user (registration) with image upload
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If image was uploaded, delete it from Cloudinary
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user
    const userData = {
      name,
      email,
      password, // In production, you should hash this password
    };

    // Add image data if uploaded
    if (req.file) {
      userData.profileImage = req.file.path;
      userData.cloudinaryId = req.file.filename;
    }

    const user = new User(userData);
    const savedUser = await user.save();

    // Return user without password
    const { password: userPassword, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    // If there's an error and image was uploaded, delete it from Cloudinary
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

module.exports = router;
