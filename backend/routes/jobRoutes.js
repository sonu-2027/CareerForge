const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// GET  /api/jobs       - Fetch all jobs (public, with pagination & filters)
// POST /api/jobs       - Create a new job (protected)
router.route("/").get(getJobs).post(protect, createJob);

// GET    /api/jobs/:id  - Get single job (public)
// PUT    /api/jobs/:id  - Update a job (protected)
// DELETE /api/jobs/:id  - Delete a job (protected)
router.route("/:id").get(getJobById).put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
