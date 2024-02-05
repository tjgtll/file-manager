import readline from "readline";
import { handlerInput } from "./utils/handlerInput.js";
const start = async () => {
  const args = process.argv.slice(2);
  const username =
    args.length > 0 && args[0].startsWith("--username")
      ? args[0].split("=")[1]
      : "Mystery Explorer";

  console.log(`Welcome to the File Manager, ${username}!`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on("line", (line) => {
    handlerInput(line);
  }).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  });
};

start();
