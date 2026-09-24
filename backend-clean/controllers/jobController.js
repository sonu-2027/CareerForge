const Job = require("../models/Job");

// @desc    Get all jobs with pagination and filtering
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      location,
      jobType,
      company,
      search,
    } = req.query;

    // Build filter object dynamically
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" }; // case-insensitive
    }
    if (jobType) {
      filter.jobType = { $regex: jobType, $options: "i" };
    }
    if (company) {
      filter.company = { $regex: company, $options: "i" };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // cap at 100
    const skip = (pageNum - 1) * limitNum;

    const [jobs, totalJobs] = await Promise.all([
      Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Job.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalJobs / limitNum);

    res.status(200).json({
      success: true,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalJobs,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid job ID format." });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Create a new job listing
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, description, source, applyLink } = req.body;

    const job = await Job.create({ title, company, location, jobType, description, source, applyLink });

    res.status(201).json({ success: true, message: "Job created successfully.", job });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Update a job listing
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    res.status(200).json({ success: true, message: "Job updated successfully.", job });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid job ID format." });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

// @desc    Delete a job listing
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }
    res.status(200).json({ success: true, message: "Job deleted successfully." });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid job ID format." });
    }
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob };
