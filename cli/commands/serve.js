import { Command } from "commander";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { banner, theme } from "../lib/theme.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");

export const serveCommand = new Command("serve")
  .description("Start the Parley web dashboard")
  .option("-p, --port <port>", "Port to serve on", "5173")
  .option("--build", "Serve production build instead of dev server")
  .action((opts) => {
    banner();

    if (opts.build) {
      console.log(theme.teal("  Building for production..."));
      execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });
      console.log();
      console.log(theme.teal(`  Serving production build on port ${opts.port}...`));
      console.log(theme.dim(`  Press Ctrl+C to stop.\n`));
      execSync(`npx vite preview --port ${opts.port}`, {
        cwd: projectRoot,
        stdio: "inherit",
      });
    } else {
      console.log(theme.teal(`  Starting dev server on port ${opts.port}...`));
      console.log(theme.dim(`  Press Ctrl+C to stop.\n`));
      execSync(`npx vite --port ${opts.port}`, {
        cwd: projectRoot,
        stdio: "inherit",
      });
    }
  });
