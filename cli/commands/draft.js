import { Command } from "commander";
import chalk from "chalk";
import notifications from "../lib/notifications.js";
import { banner, heatBadge, theme } from "../lib/theme.js";

export const draftCommand = new Command("draft")
  .description("View a shielded reframe and proposed response for a notification")
  .argument("[id]", "Notification ID (1-8). Omit to list all with responses.")
  .action((id) => {
    banner();

    if (!id) {
      const withResponses = notifications.filter((n) => n.proposedResponse);
      console.log(theme.bold("  Notifications with draft responses:\n"));
      withResponses.forEach((n) => {
        console.log(
          `  ${heatBadge(n.heatLevel)} ${theme.bold(`#${n.id}`)} ${n.sender}`
        );
        console.log(theme.dim(`     ${n.neutralSummary}`));
        console.log();
      });
      console.log(theme.dim(`  Use: parley draft <id> to see the full draft.\n`));
      return;
    }

    const notification = notifications.find((n) => n.id === parseInt(id));

    if (!notification) {
      console.log(theme.danger(`  ✗ Notification #${id} not found.\n`));
      return;
    }

    // Header
    console.log(
      `  ${heatBadge(notification.heatLevel)} ${theme.bold(notification.sender)}`
    );
    console.log(theme.dim(`  ${notification.channel} · ${notification.timestamp}`));
    console.log();

    // Neutral reframe
    console.log(theme.teal.bold("  ── Neutral Reframe ──────────────────────────────"));
    console.log(`  ${notification.neutralSummary}`);
    console.log();

    // Raw (shielded)
    console.log(theme.walnut.bold("  ── Raw Message (Original) ──────────────────────"));
    if (notification.heatLevel === "high") {
      console.log(theme.dim(`  ⚠ This message was shielded due to high emotional heat.`));
    }
    console.log(`  ${notification.rawText}`);
    console.log();

    // Proposed response
    if (notification.proposedResponse) {
      console.log(theme.teal.bold("  ── Proposed Response (Parley Draft) ────────────"));
      console.log(`  ${chalk.green("▸")} ${notification.proposedResponse}`);
      console.log();
      console.log(theme.dim("  This response is: effective, brief, and boundaried."));
      console.log(theme.dim("  Edit before sending, or use as-is."));
    } else {
      console.log(theme.dim("  ── No response needed (informational only) ──"));
    }
    console.log();
  });
