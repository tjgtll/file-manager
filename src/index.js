import readline from "readline";
import os from "os";
import { printCurrentDirectory } from "./utils/printCurrentDirectory.js";
import { handlerInput } from "./utils/handlerInput.js";
const start = async () => {
  const args = process.argv.slice(2);
  const username =
    args.length > 0 && args[0].startsWith("--username")
      ? args[0].split("=")[1]
      : "Mystery Explorer";
  const currentDir = { path: os.homedir() };
  console.log(`Welcome to the File Manager, ${username}!`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();
  printCurrentDirectory(currentDir.path);

  rl.on("line", (line) => {
    handlerInput(line, currentDir, rl);
    printCurrentDirectory(currentDir.path);
  }).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  });
};

start();
