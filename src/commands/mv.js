import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import path from "path";

export const mv = async (sourcePath, targetDirectory) => {
  try {
    const fileName = path.basename(sourcePath);
    const targetPath = path.join(targetDirectory, fileName);

    const readable = createReadStream(sourcePath);
    const writable = createWriteStream(targetPath);

    readable.pipe(writable);

    await new Promise((resolve, reject) => {
      writable.on("finish", async () => {
        try {
          await rm(sourcePath);
          console.log(`File moved successfully to ${targetPath}`);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {}
};
