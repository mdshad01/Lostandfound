const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const router = express.Router();
const LostItem = require("../models/LostItem");
const User = require("../models/user");

// Configure Cloudinary (add these to your .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// POST /api/lost-items - Create a new lost item report
router.post("/", authenticateToken, upload.single("productImage"), async (req, res) => {
  try {
    const { productName, description, finderName, contact, location, dateLost } = req.body;

    // Validate required fields
    if (!productName || !description || !finderName || !contact || !location || !dateLost) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "lost-items",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    // Create new lost item
    const lostItem = new LostItem({
      productName,
      description,
      finderName,
      contact,
      location,
      dateLost: new Date(dateLost),
      productImage: uploadResult.secure_url,
      reportedBy: req.user.userId,
    });

    await lostItem.save();

    res.status(201).json({
      success: true,
      message: "Lost item reported successfully",
      item: lostItem,
    });
  } catch (error) {
    console.error("Report item error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/lost-items - Get all lost items (latest first)
router.get("/", async (req, res) => {
  try {
    const lostItems = await LostItem.find().populate("reportedBy", "username email").sort({ createdAt: -1 }); // Latest first

    res.json({
      success: true,
      items: lostItems,
    });
  } catch (error) {
    console.error("Get items error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/lost-items/:id - Get a specific lost item
router.get("/:id", async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id).populate("reportedBy", "username email");

    if (!lostItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({
      success: true,
      item: lostItem,
    });
  } catch (error) {
    console.error("Get item error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
