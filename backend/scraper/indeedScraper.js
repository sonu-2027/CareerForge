const axios = require("axios");
const cheerio = require("cheerio");
const saveJobs = require("./saveJobs");

// NOTE: Indeed actively blocks scrapers (HTTP 403 / captcha) and its markup
// changes often, so this scraper may legitimately return 0 jobs. Remotive is
// the reliable source; failures here are logged and never crash the server.
const runIndeed = async () => {
  try {
    console.log("🔎 Scraping Indeed...");

    const url = "https://www.indeed.com/jobs?q=software+developer&l=remote";

    const { data } = await axios.get(url, {
      timeout: 20000,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    const $ = cheerio.load(data);
    const jobs = [];

    $(".job_seen_beacon").each((i, el) => {
      const title = $(el).find("h2 span").text().trim();
      const company = $(el).find("[data-testid='company-name'], .companyName").text().trim();
      const location = $(el).find("[data-testid='text-location'], .companyLocation").text().trim();
      const description = $(el).find(".job-snippet, [data-testid='job-snippet']").text().trim();
      const href = $(el).find("h2 a").attr("href");

      if (title && company && href) {
        jobs.push({
          title: title.slice(0, 100),
          company: company.slice(0, 100),
          location: location || "Remote",
          jobType: "Full-time",
          description: description || title,
          source: "Indeed",
          applyLink: href.startsWith("http") ? href : `https://www.indeed.com${href}`,
        });
      }
    });

    const saved = await saveJobs(jobs);
    console.log(`✅ Indeed: ${saved} jobs saved`);
  } catch (err) {
    console.error("❌ Indeed error:", err.message);
  }
};

module.exports = runIndeed;
