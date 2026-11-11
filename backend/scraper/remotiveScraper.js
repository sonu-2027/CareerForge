const axios = require("axios");
const saveJobs = require("./saveJobs");

// Remotive uses values like "full_time", "contract", "part_time", "freelance", "internship"
const JOB_TYPE_MAP = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  freelance: "Freelance",
  internship: "Internship",
};

const runRemotive = async () => {
  try {
    console.log("🌐 Fetching Remotive jobs...");

    const { data } = await axios.get("https://remotive.com/api/remote-jobs", {
      timeout: 20000,
    });

    const jobs = (data.jobs || []).map((job) => ({
      title: String(job.title || "").slice(0, 100),
      company: String(job.company_name || "").slice(0, 100),
      location: job.candidate_required_location || "Remote",
      jobType: JOB_TYPE_MAP[job.job_type] || "Remote",
      description: String(job.description || job.title || "").slice(0, 50000),
      source: "Remotive",
      applyLink: job.url,
    }));

    const saved = await saveJobs(jobs);
    console.log(`✅ Remotive: ${saved} jobs saved`);
  } catch (err) {
    console.error("❌ Remotive error:", err.message);
  }
};

module.exports = runRemotive;
