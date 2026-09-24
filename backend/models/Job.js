const mongoose = require("mongoose");

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract", "Freelance", "Remote"];

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: {
        values: JOB_TYPES,
        message: `Job type must be one of: ${JOB_TYPES.join(", ")}`,
      },
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    source: {
      type: String,
      trim: true,
      default: "Manual",
    },
    applyLink: {
      type: String,
      required: [true, "Apply link is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster filtering queries
jobSchema.index({ location: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ company: 1 });
jobSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Job", jobSchema);
