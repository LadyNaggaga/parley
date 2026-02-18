import fs from "fs";
import path from "path";
import os from "os";

const STATE_DIR = path.join(os.homedir(), ".parley");
const STATE_FILE = path.join(STATE_DIR, "state.json");

const DEFAULT_STATE = {
  boundaryMode: false,
  lastUpdated: null,
};

export function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
    }
  } catch {
    // corrupted state, reset
  }
  return { ...DEFAULT_STATE };
}

export function writeState(state) {
  if (!fs.existsSync(STATE_DIR)) {
    fs.mkdirSync(STATE_DIR, { recursive: true });
  }
  state.lastUpdated = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  return state;
}
