import { Command } from "commander";
import notifications, { getCognitiveLoad } from "../lib/notifications.js";
import { readState } from "../lib/state.js";
import { banner, theme } from "../lib/theme.js";

export const statusCommand = new Command("status")
  .description("Show Parley system status and cognitive load")
  .action(() => {
    banner();

    const state = readState();
    const load = getCognitiveLoad(notifications);
    const loadColor = load >= 80 ? theme.danger : load >= 50 ? theme.warning : theme.success;

    const highCount = notifications.filter((n) => n.heatLevel === "high").length;
    const medCount = notifications.filter((n) => n.heatLevel === "med").length;
    const lowCount = notifications.filter((n) => n.heatLevel === "low").length;

    console.log(theme.bold("  System Status"));
    console.log(theme.dim("  ─────────────────────────────────────"));
    console.log();
    console.log(`  Cognitive Load:   ${loadColor.bold(`${load}%`)}${load >= 80 ? theme.danger(" ⚠ FOCUS MODE") : ""}`);
    console.log(`  Notifications:    ${theme.bold(String(notifications.length))} total`);
    console.log(`    🔴 High:        ${theme.danger.bold(String(highCount))}`);
    console.log(`    🟡 Med:         ${theme.warning.bold(String(medCount))}`);
    console.log(`    🟢 Low:         ${theme.success.bold(String(lowCount))}`);
    console.log();
    console.log(
      `  Boundary Mode:    ${state.boundaryMode ? theme.success.bold("ON 🛡") : theme.warning("OFF")}`
    );
    console.log(`  OpenClaw Agent:   ${theme.success("● Connected")} ${theme.dim("(localhost:4891)")}`);
    console.log(`  Dashboard:        ${theme.teal("http://localhost:5173")}`);
    if (state.lastUpdated) {
      console.log(`  Last Updated:     ${theme.dim(state.lastUpdated)}`);
    }
    console.log();
  });
