import { createReadStream, createWriteStream } from "fs";
import path from "path";

export const cp = (sourcePath, targetDirectory) => {
  const fileName = path.basename(sourcePath);
  const targetPath = path.join(targetDirectory, fileName);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  writeStream.on("finish", () => {
    console.log(`File copied successfully to ${targetPath}`);
  });

  readStream.pipe(writeStream);
};
