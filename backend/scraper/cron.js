const cron = require("node-cron");

const runRemotive = require("./remotiveScraper");
const runIndeed = require("./indeedScraper");

const startCron = () => {
  console.log("🟢 Cron started...");

  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running ALL scrapers...");

    try {
      await runRemotive();
      await runIndeed();

      console.log("✅ All scrapers finished");
    } catch (err) {
      console.error("❌ Cron error:", err.message);
    }
  });
};

module.exports = startCron;
