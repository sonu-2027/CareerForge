const axios = require("axios");
const cheerio = require("cheerio");
const Job = require("../models/Job");

const runIndeed = async () => {
  try {
    console.log("🔎 Scraping Indeed...");

    const url = "https://www.indeed.com/jobs?q=software+developer&l=remote";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);
    const jobs = [];

    $(".job_seen_beacon").each((i, el) => {
      const title = $(el).find("h2 span").text().trim();
      const company = $(el).find(".companyName").text().trim();
      const location = $(el).find(".companyLocation").text().trim();
      const description = $(el).find(".job-snippet").text().trim();

      if (title && company) {
        jobs.push({
          title,
          company,
          location,
          description,
          provider: "Indeed",
          createdAt: new Date(),
        });
      }
    });

    for (let job of jobs) {
      await Job.findOneAndUpdate(
        { title: job.title, company: job.company },
        job,
        { upsert: true },
      );
    }

    console.log(`✅ Indeed: ${jobs.length} jobs saved`);
  } catch (err) {
    console.error("❌ Indeed error:", err.message);
  }
};

module.exports = runIndeed;
