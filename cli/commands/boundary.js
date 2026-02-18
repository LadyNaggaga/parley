import { Command } from "commander";
import { readState, writeState } from "../lib/state.js";
import { banner, theme } from "../lib/theme.js";

export const boundaryCommand = new Command("boundary")
  .description("Toggle or check Boundary Mode (auto-reject non-critical pings)")
  .option("--on", "Enable Boundary Mode")
  .option("--off", "Disable Boundary Mode")
  .action((opts) => {
    banner();

    const state = readState();

    if (opts.on) {
      state.boundaryMode = true;
      writeState(state);
      console.log(theme.success.bold("  🛡  Boundary Mode: ON"));
      console.log(theme.dim("  → Auto-rejecting non-critical meeting invites"));
      console.log(theme.dim("  → Suppressing low-priority pings"));
      console.log(theme.dim("  → Batching informational notifications"));
    } else if (opts.off) {
      state.boundaryMode = false;
      writeState(state);
      console.log(theme.warning("  🛡  Boundary Mode: OFF"));
      console.log(theme.dim("  → All notifications will flow through normally"));
    } else {
      // Show current status
      const mode = state.boundaryMode;
      console.log(
        mode
          ? theme.success.bold("  🛡  Boundary Mode: ON")
          : theme.warning("  🛡  Boundary Mode: OFF")
      );
      if (state.lastUpdated) {
        console.log(theme.dim(`  Last updated: ${state.lastUpdated}`));
      }
      console.log();
      console.log(theme.dim("  Use --on or --off to toggle."));
    }
    console.log();
  });
