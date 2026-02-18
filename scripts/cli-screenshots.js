import { execSync } from "child_process";
import puppeteer from "puppeteer";
import AnsiToHtml from "ansi-to-html";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, "..", "docs");
const convert = new AnsiToHtml({ fg: "#e8dcc8", bg: "#2a2118" });

const commands = [
  { name: "cli-status", cmd: "parley status", width: 680 },
  { name: "cli-triage", cmd: "parley triage", width: 960 },
  { name: "cli-draft", cmd: "parley draft 1", width: 780 },
  { name: "cli-boundary", cmd: "parley boundary --on", width: 680 },
];

async function captureCli() {
  const browser = await puppeteer.launch({ headless: true });

  for (const { name, cmd, width } of commands) {
    const ansi = execSync(cmd, {
      env: { ...process.env, FORCE_COLOR: "1" },
      encoding: "utf-8",
    });

    const html = convert.toHtml(ansi);
    const page = await browser.newPage();
    await page.setViewport({ width, height: 100, deviceScaleFactor: 2 });
    await page.setContent(`
      <html>
      <body style="
        margin: 0; padding: 24px 32px;
        background: #2a2118;
        font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
        font-size: 13px; line-height: 1.6;
        color: #e8dcc8;
        border-radius: 12px;
      ">
        <div style="
          background: #1e1710;
          border-radius: 10px;
          padding: 20px 24px;
          border: 1px solid #3d2e1f;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        ">
          <div style="display:flex;gap:6px;margin-bottom:14px;">
            <span style="width:12px;height:12px;border-radius:50%;background:#c45d4a;display:inline-block;"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#d4a960;display:inline-block;"></span>
            <span style="width:12px;height:12px;border-radius:50%;background:#5aada3;display:inline-block;"></span>
          </div>
          <div style="color:#887764;font-size:11px;margin-bottom:10px;">$ ${cmd}</div>
          <pre style="margin:0;white-space:pre-wrap;word-wrap:break-word;">${html}</pre>
        </div>
      </body>
      </html>
    `);

    const body = await page.$("body");
    const box = await body.boundingBox();
    await page.setViewport({
      width,
      height: Math.ceil(box.height),
      deviceScaleFactor: 2,
    });
    await page.screenshot({
      path: path.join(docsDir, `${name}.png`),
      fullPage: true,
    });
    console.log(`✓ ${name}.png`);
    await page.close();
  }

  await browser.close();
  console.log("\nAll CLI screenshots saved to docs/");
}

captureCli().catch((err) => {
  console.error(err);
  process.exit(1);
});
