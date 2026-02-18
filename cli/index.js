#!/usr/bin/env node

import { Command } from "commander";
import { triageCommand } from "./commands/triage.js";
import { draftCommand } from "./commands/draft.js";
import { boundaryCommand } from "./commands/boundary.js";
import { statusCommand } from "./commands/status.js";
import { serveCommand } from "./commands/serve.js";

const program = new Command();

program
  .name("parley")
  .description("🪶 Parley — Communication Shield CLI")
  .version("1.0.0");

program.addCommand(triageCommand);
program.addCommand(draftCommand);
program.addCommand(boundaryCommand);
program.addCommand(statusCommand);
program.addCommand(serveCommand);

program.parse();
