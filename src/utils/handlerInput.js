import { printCurrentDirectory } from "./printCurrentDirectory.js";
import { up } from "../commands/up.js";
import os from "os";
export const handlerInput = (line) => {
  const commandArr = line.trim().split(" ");
  const command = commandArr[0];
  let currentDir = os.homedir();
  switch (command) {
    case "test":
      console.log("This is a test command");
      break;
    case "up":
      currentDir = up(currentDir);
      break;
    default:
      console.log("Invalid input");
      break;
  }
  printCurrentDirectory(currentDir);
};
