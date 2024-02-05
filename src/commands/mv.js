import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import path from "path";
import { handlerError } from "../utils/handlerError.js";
export const mv = async (sourcePath, targetDirectory, curr) => {
  try {
    const fileName = path.basename(sourcePath);
    let fullTargetPath = targetDirectory;
    if (!path.isAbsolute(targetDirectory)) {
      fullTargetPath = path.join(curr, targetDirectory);
    }

    const targetPath = path.join(fullTargetPath, fileName);

    const readable = createReadStream(sourcePath);
    const writable = createWriteStream(targetPath);
    readable.on("error", (err) => {
      handlerError(err);
    });

    writable.on("error", (err) => {
      handlerError(err);
    });

    readable.pipe(writable);

    await new Promise((resolve, reject) => {
      writable.on("finish", async () => {
        try {
          await rm(sourcePath);
          console.log(`File moved successfully to ${targetPath}`);
          resolve();
        } catch (err) {
          handlerError(err);
        }
      });
    });
  } catch (err) {
    handlerError(err);
  }
};
