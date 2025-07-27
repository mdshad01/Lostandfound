const mongoose = require("mongoose");

const reportItemSchema = new mongoose.Schema(
  {
    itemImage: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    dateFound: {
      type: Date,
      required: true,
    },
    finderName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "claimed"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const ReportItem = mongoose.model("ReportItem", reportItemSchema);

module.exports = ReportItem;
