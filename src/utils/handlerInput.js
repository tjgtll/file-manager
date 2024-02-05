import path from "path";
import { removeQuotes } from "./removeQuotes.js";
import { processArgument } from "./argumentUtils.js";
import { printCurrentDirectory } from "./printCurrentDirectory.js";
import { handleOSCommand } from "./handleOSCommand.js";
import { ls } from "../commands/ls.js";
import { up } from "../commands/up.js";
import { cd } from "../commands/cd.js";
import { rn } from "../commands/rn.js";
import { rm } from "../commands/rm.js";
import { cp } from "../commands/cp.js";
import { mv } from "../commands/mv.js";
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
    //cp t.txt c:\Users\user\desktop
    case "cp":
      await cp(path.resolve(currentDir.path, args[0]), args[1]);
      break;
    //mv t.txt c:\Users\user\desktop
    case "mv":
      await mv(path.resolve(currentDir.path, args[0]), args[1]);
      break;
    case "rm":
      await rm(path.resolve(currentDir.path, args[0]));
      break;
    case "os":
      await handleOSCommand(args);
      break;
    default:
      console.log("Invalid input");
      break;
  }
  printCurrentDirectory(currentDir.path);
};
