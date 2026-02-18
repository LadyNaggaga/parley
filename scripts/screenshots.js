import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, "..", "docs");

async function capture() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Dashboard - full view
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:5188", { waitUntil: "networkidle0" });
  await page.screenshot({
    path: path.join(docsDir, "dashboard.png"),
    fullPage: false,
  });
  console.log("✓ dashboard.png");

  // Full page scroll
  await page.screenshot({
    path: path.join(docsDir, "dashboard-full.png"),
    fullPage: true,
  });
  console.log("✓ dashboard-full.png");

  // Click a high-heat notification to open drafting room
  const cards = await page.$$("button");
  for (const card of cards) {
    const text = await card.evaluate((el) => el.textContent);
    if (text.includes("Status inquiry")) {
      await card.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(docsDir, "drafting-room.png"),
    fullPage: true,
  });
  console.log("✓ drafting-room.png");

  await browser.close();
  console.log("\nAll screenshots saved to docs/");
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
