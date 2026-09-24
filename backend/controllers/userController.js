const User = require("../models/User");
const Job = require("../models/Job");

// @desc    Get logged-in user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Update logged-in user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    // Update fields if provided
    if (name) user.name = name;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(409).json({ success: false, message: "Email is already in use by another account." });
      }
      user.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
      }
      user.password = password; // Pre-save hook will hash it
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Save a job to the user's saved jobs list
// @route   POST /api/users/saved-jobs/:jobId
// @access  Private
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Verify job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    const user = await User.findById(req.user._id);

    // Check if already saved
    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ success: false, message: "Job is already saved." });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({ success: true, message: "Job saved successfully." });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid job ID format." });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Remove a saved job from the user's list
// @route   DELETE /api/users/saved-jobs/:jobId
// @access  Private
const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user.savedJobs.includes(jobId)) {
      return res.status(404).json({ success: false, message: "Job not found in your saved list." });
    }

    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    res.status(200).json({ success: true, message: "Job removed from saved list." });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid job ID format." });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Get all saved jobs for the logged-in user
// @route   GET /api/users/saved-jobs
// @access  Private
const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs");

    res.status(200).json({
      success: true,
      count: user.savedJobs.length,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

module.exports = { getProfile, updateProfile, saveJob, removeSavedJob, getSavedJobs };
