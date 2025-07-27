const express = require("express");
const multer = require("multer");
const ReportItem = require("../models/ReportItem");
const router = express.Router();

// File upload setup
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// POST - Create new report
router.post("/", upload.single("itemImage"), async (req, res) => {
  try {
    const reportData = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      dateFound: req.body.date,
      finderName: req.body.finderName,
      contactNumber: req.body.contactNumber,
    };

    if (req.file) {
      reportData.itemImage = req.file.path;
    }

    const reportItem = new ReportItem(reportData);
    await reportItem.save();

    res.status(201).json({
      success: true,
      message: "Item reported successfully!",
      data: reportItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET - Get all available items
router.get("/", async (req, res) => {
  try {
    const items = await ReportItem.find({ status: "available" }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET - Get single item
router.get("/:id", async (req, res) => {
  try {
    const item = await ReportItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PUT - Claim item
router.put("/:id/claim", async (req, res) => {
  try {
    const item = await ReportItem.findByIdAndUpdate(req.params.id, { status: "claimed" }, { new: true });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      message: "Item claimed successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
