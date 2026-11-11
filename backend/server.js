require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Cron
const startCron = require("./scraper/cron");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/contact", contactRoutes);

// Health
app.get("/", (req, res) => {
  res.json({ success: true, message: "API running 🚀" });
});

// Unknown routes -> JSON 404 instead of Express's HTML page
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Start: connect to the DB first, then listen and start the scrapers
// (scrapers write to the DB, so they must not run before it's connected).
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set. Add it to your environment variables.");
  process.exit(1);
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  startCron();
});
