const cron = require("node-cron");

const runRemotive = require("./remotiveScraper");
const runIndeed = require("./indeedScraper");

let running = false;

const runAll = async () => {
  if (running) return; // never overlap two runs
  running = true;
  try {
    console.log("⏰ Running ALL scrapers...");
    await runRemotive();
    await runIndeed();
    console.log("✅ All scrapers finished");
  } catch (err) {
    console.error("❌ Cron error:", err.message);
  } finally {
    running = false;
  }
};

const startCron = () => {
  console.log("🟢 Cron started...");

  // Once at startup so a fresh database is filled immediately...
  runAll();

  // ...then every 6 hours. (It used to run every minute, which hammers the
  // job sources and gets the server IP rate-limited / blocked.)
  cron.schedule("0 */6 * * *", runAll);
};

module.exports = startCron;
