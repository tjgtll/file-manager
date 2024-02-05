import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { handlerError } from "../utils/handlerError.js";
export const cp = (sourcePath, targetDirectory, curr) => {
  const fileName = path.basename(sourcePath);
  let fullTargetPath = targetDirectory;
  if (!path.isAbsolute(targetDirectory)) {
    fullTargetPath = path.join(curr, targetDirectory);
  }

  const targetPath = path.join(fullTargetPath, fileName);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  readStream.on("error", (err) => {
    handlerError(err);
  });

  writeStream.on("error", (err) => {
    handlerError(err);
  });

  writeStream.on("finish", () => {
    console.log(`File copied successfully to ${targetPath}`);
  });

  readStream.pipe(writeStream);
};
