import { printCurrentDirectory } from "./printCurrentDirectory.js";
import os from "os";
export const handlerInput = (line) => {
  const commandArr = line.trim().split(" ");
  const command = commandArr[0];
  let currentDir = os.homedir();
  switch (command) {
    case "test":
      console.log("This is a test command");
      printCurrentDirectory(currentDir);
      break;

    default:
      break;
  }
};
