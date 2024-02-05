import { createReadStream, createWriteStream } from "fs";
import { join } from "path";

export const cp = (sourcePath, targetDirectory) => {
  const fileName = sourcePath.split("\\").pop();
  console.log(fileName, targetDirectory);
  const targetPath = join(targetDirectory, fileName);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(targetPath);

  writeStream.on("finish", () => {
    console.log(`File copied successfully to ${targetPath}`);
  });

  readStream.pipe(writeStream);
};
