const Job = require("../models/Job");

// Upsert scraped jobs in one round-trip. Jobs are matched on applyLink (a
// stable unique URL), and validation is applied on insert so that scraped jobs
// always satisfy the Job schema (jobType, applyLink, ...).
const saveJobs = async (jobs) => {
  const valid = jobs.filter((j) => j.title && j.company && j.applyLink);
  if (valid.length === 0) return 0;

  const ops = valid.map((job) => ({
    updateOne: {
      filter: { applyLink: job.applyLink },
      update: { $set: job },
      upsert: true,
    },
  }));

  await Job.bulkWrite(ops, { ordered: false });
  return valid.length;
};

module.exports = saveJobs;
