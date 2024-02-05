import { removeQuotes } from "./removeQuotes.js";
import { processArgument } from "./argumentUtils.js";
import { printCurrentDirectory } from "./printCurrentDirectory.js";
import { ls } from "../commands/ls.js";
import { up } from "../commands/up.js";
import { cd } from "../commands/cd.js";
import { rn } from "../commands/rn.js";
import { cat } from "../commands/cat.js";
import { add } from "../commands/add.js";

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
      cat(currentDir.path + "\\" + args[0]);
      break;
    case "add":
      add(currentDir.path, args[0]);
      break;
    case "rn":
      await rn(
        currentDir.path + "\\" + args[0],
        currentDir.path + "\\" + args[1]
      );
      break;
    case "rn":
      break;
    default:
      console.log("Invalid input");
      break;
  }
  printCurrentDirectory(currentDir.path);
};
