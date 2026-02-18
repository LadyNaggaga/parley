import { Command } from "commander";
import Table from "cli-table3";
import chalk from "chalk";
import notifications, { getCognitiveLoad } from "../lib/notifications.js";
import { banner, heatBadge, theme } from "../lib/theme.js";

export const triageCommand = new Command("triage")
  .description("View heat-mapped notification triage table")
  .option("-f, --filter <level>", "Filter by heat level: high, med, low")
  .option("--raw", "Show raw message text (unshielded)")
  .action((opts) => {
    banner();

    let items = [...notifications].sort((a, b) => {
      const order = { high: 0, med: 1, low: 2 };
      return order[a.heatLevel] - order[b.heatLevel];
    });

    if (opts.filter) {
      items = items.filter((n) => n.heatLevel === opts.filter);
    }

    const load = getCognitiveLoad(notifications);
    const loadColor = load >= 80 ? theme.danger : load >= 50 ? theme.warning : theme.success;
    console.log(
      theme.dim("  Cognitive Load: ") +
      loadColor.bold(`${load}%`) +
      (load >= 80 ? theme.danger(" ⚠ FOCUS MODE") : "") +
      theme.dim(` · ${notifications.length} notifications`)
    );
    console.log();

    const table = new Table({
      head: [
        chalk.bold("Heat"),
        chalk.bold("Sender"),
        chalk.bold("Channel"),
        chalk.bold("Summary"),
      ],
      colWidths: [12, 28, 14, 50],
      wordWrap: true,
      style: { head: [], border: ["gray"] },
    });

    items.forEach((n) => {
      const summary = opts.raw ? n.rawText : n.neutralSummary;
      table.push([
        heatBadge(n.heatLevel),
        n.sender,
        n.channel,
        n.heatLevel === "high" && !opts.raw
          ? theme.dim("[shielded] ") + summary
          : summary,
      ]);
    });

    console.log(table.toString());
    console.log();

    if (!opts.raw) {
      console.log(
        theme.dim("  💡 High-heat messages are shielded. Use --raw to reveal original text.")
      );
      console.log(
        theme.dim("  💡 Use parley draft <id> to see a proposed response.")
      );
      console.log();
    }
  });
