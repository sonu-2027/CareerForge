const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  saveJob,
  removeSavedJob,
  getSavedJobs,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// All routes below are protected
router.use(protect);

// GET  /api/users/profile  - Get logged-in user profile
// PUT  /api/users/profile  - Update logged-in user profile
router.route("/profile").get(getProfile).put(updateProfile);

// GET    /api/users/saved-jobs         - Get all saved jobs
// POST   /api/users/saved-jobs/:jobId  - Save a job
// DELETE /api/users/saved-jobs/:jobId  - Remove a saved job
router.get("/saved-jobs", getSavedJobs);
router.post("/saved-jobs/:jobId", saveJob);
router.delete("/saved-jobs/:jobId", removeSavedJob);

module.exports = router;
