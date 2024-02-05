import path from "path";
import { removeQuotes } from "./removeQuotes.js";
import { processArgument } from "./argumentUtils.js";
import { printCurrentDirectory } from "./printCurrentDirectory.js";
import { handlerOSCommand } from "./handlerOSCommand.js";
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
import { handlerError } from "./handlerError.js";

export const handlerInput = async (line, currentDir, rl) => {
  const commandArr = line.trim().split(" ");
  const command = commandArr[0];
  const args = removeQuotes(commandArr.slice(1));
  const numArgs = args.length;
  try {
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
        if (numArgs === 0) {
          throw new Error("Example: cat path_to_file (cat test.txt)");
        }
        await cat(path.resolve(currentDir.path, args[0]));
        break;
      case "add":
        if (numArgs === 0) {
          throw new Error("Example: add path_to_file (add test.txt)");
        }
        add(currentDir.path, args[0]);
        break;
      case "rn":
        if (numArgs < 2) {
          throw new Error(
            "Example: rn path_to_file new_filename (rn alpha.txt beta.txt)"
          );
        }
        await rn(
          path.resolve(currentDir.path, args[0]),
          path.resolve(currentDir.path, args[1])
        );
        break;

      case "cp":
        if (numArgs < 2) {
          throw new Error(
            "Example: cp path_to_file path_to_new_directory (cp test.txt c:\\Users\\user\\desktop) or (cp test.txt desktop)"
          );
        }
        await cp(
          path.resolve(currentDir.path, args[0]),
          args[1],
          currentDir.path
        );
        break;

      case "mv":
        if (numArgs < 2) {
          throw new Error(
            "Example: rn path_to_file path_to_new_directory (mv test.txt c:\\Users\\user\\desktop) or (mv test.txt desktop)"
          );
        }
        await mv(
          path.resolve(currentDir.path, args[0]),
          args[1],
          currentDir.path
        );
        break;
      case "rm":
        if (numArgs === 0) {
          throw new Error("Example: rm path_to_file (rm test.txt)");
        }
        await rm(path.resolve(currentDir.path, args[0]));
        break;
      case "os":
        await handlerOSCommand(args);
        break;
      case "hash":
        if (numArgs === 0) {
          throw new Error("Example: hash path_to_file (hash test.txt)");
        }
        await hash(path.resolve(currentDir.path, args[0]));
        break;
      case "compress":
        if (numArgs < 2) {
          throw new Error(
            "Example: compress path_to_file path_to_destination (compress t.txt c:\\Users\\user\\desktop)"
          );
        }
        await compress(
          path.resolve(currentDir.path, args[0]),
          args[1],
          currentDir.path
        );
        break;
      case "decompress":
        if (numArgs < 2) {
          throw new Error(
            "Example: decompress path_to_file path_to_destination (add test.txt)"
          );
        }
        await decompress(
          path.resolve(currentDir.path, args[0]),
          args[1],
          currentDir.path
        );
        break;
      case ".exit":
        rl.close();
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    handlerError(err);
  }

  printCurrentDirectory(currentDir.path);
};
