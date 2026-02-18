import chalk from "chalk";

const cream = chalk.hex("#f3dfc0");
const teal = chalk.hex("#3d8f85");
const walnut = chalk.hex("#6b4c31");
const heatHigh = chalk.hex("#c45d4a");
const heatMed = chalk.hex("#d4a960");
const heatLow = chalk.hex("#5aada3");

export const theme = {
  cream,
  teal,
  walnut,
  heatHigh,
  heatMed,
  heatLow,
  brand: teal.bold,
  dim: chalk.gray,
  bold: chalk.bold,
  success: teal,
  warning: heatMed,
  danger: heatHigh,
};

export function banner() {
  console.log();
  console.log(theme.brand("  🪶 Parley") + theme.dim(" — Communication Shield"));
  console.log(theme.dim("  Less noise. More clarity. Protect your stillness."));
  console.log();
}

export function heatBadge(level) {
  switch (level) {
    case "high":
      return heatHigh.bold(" 🔴 HIGH ");
    case "med":
      return heatMed.bold(" 🟡 MED  ");
    case "low":
      return heatLow.bold(" 🟢 LOW  ");
    default:
      return chalk.gray(` ${level} `);
  }
}
