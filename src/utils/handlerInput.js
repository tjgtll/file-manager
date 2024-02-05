import { removeQuotes } from "./removeQuotes.js";
import { processArgument } from "./argumentUtils.js";
import { printCurrentDirectory } from "./printCurrentDirectory.js";
import { ls } from "../commands/ls.js";
import { up } from "../commands/up.js";
import { cd } from "../commands/cd.js";
import { cat } from "../commands/cat.js";

export const handlerInput = async (line, currentDir) => {
  const commandArr = line.trim().split(" ");
  const command = commandArr[0];
  const args = removeQuotes(commandArr.slice(1));

  switch (command) {
    case "test":
      console.log("This is a test command");
      break;
    case "up":
      currentDir.path = up(currentDir.path);
      break;
    case "cd":
      try {
        const newDir = await cd(currentDir.path, processArgument(args[0]));
        if (newDir !== null) {
          currentDir.path = newDir;
        }
      } catch (error) {
        console.error("An error occurred while changing directory:", error);
      }
      break;
    case "ls":
      ls(currentDir.path);
      break;
    case "cat":
      let filePath = currentDir.path + "\\" + args[0];
      console.log(args[0]);
      cat(filePath);
      break;
    default:
      console.log("Invalid input");
      break;
  }
  printCurrentDirectory(currentDir.path);
};
