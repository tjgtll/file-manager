import path from "path";
import { removeQuotes } from "./removeQuotes.js";
import { processArgument } from "./argumentUtils.js";
import { printCurrentDirectory } from "./printCurrentDirectory.js";
import { handlerOSCommand } from "./handlerOSCommand.js";
import { handlerError } from "./handlerError.js";
import { ls } from "../commands/ls.js";
import { up } from "../commands/up.js";
import { cd } from "../commands/cd.js";
import { rn } from "../commands/rn.js";
import { rm } from "../commands/rm.js";
import { cp } from "../commands/cp.js";
import { mv } from "../commands/mv.js";
import { cat } from "../commands/cat.js";
import { add } from "../commands/add.js";
import { hash } from "../commands/hash.js";
import { compress } from "../commands/compress.js";
import { decompress } from "../commands/decompress.js";

export const handlerInput = async (line, currentDir, rl) => {
  const commandArr = line.trim().split(" ");
  const command = commandArr[0];
  const args = removeQuotes(commandArr.slice(1));

  switch (command) {
    case "test":
      console.log("This is a test command");
      break;
    case "up":
      await up(currentDir);
      break;
    case "cd":
      await cd(currentDir, args[0]);
      break;
    case "ls":
      ls(currentDir.path);
      break;
    case "cat":
      cat(path.resolve(currentDir.path, args[0]));
      break;
    case "add":
      add(currentDir.path, args[0]);
      break;
    case "rn":
      await rn(
        path.resolve(currentDir.path, args[0]),
        path.resolve(currentDir.path, args[1])
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
      await handlerOSCommand(args);
      break;
    case "hash":
      await hash(path.resolve(currentDir.path, args[0]));
      break;
    //compress t.txt c:\Users\user\desktop
    case "compress":
      await compress(path.resolve(currentDir.path, args[0]), args[1]);
      break;
    case "decompress":
      await decompress(path.resolve(currentDir.path, args[0]), args[1]);
      break;
    case ".exit":
      rl.close();
      break;
    default:
      console.log("Invalid input");
      break;
  }
};
