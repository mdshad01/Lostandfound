const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const lostItemRoutes = require("./routes/lostItems");

app.use("/api", authRoutes);
app.use("/api/lost-items", lostItemRoutes);

// Root route
app.get("/", (req, res) => {
  res.send({ message: "Backend is running" });
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    await mongoose.connection.db.admin().ping();

    res.json({
      status: "ok",
      database: dbStatus,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
