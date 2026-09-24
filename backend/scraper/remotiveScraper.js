const axios = require("axios");
const Job = require("../models/Job");

const runRemotive = async () => {
  try {
    console.log("🌐 Fetching Remotive jobs...");

    const { data } = await axios.get("https://remotive.com/api/remote-jobs");

    const jobs = data.jobs.map((job) => ({
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location || "Remote",
      description: job.description || "",
      source: job.url,
      provider: "Remotive",
      createdAt: new Date(),
    }));

    for (let job of jobs) {
      await Job.findOneAndUpdate(
        { title: job.title, company: job.company },
        job,
        { upsert: true },
      );
    }

    console.log(`✅ Remotive: ${jobs.length} jobs saved`);
  } catch (err) {
    console.error("❌ Remotive error:", err.message);
  }
};

module.exports = runRemotive;
