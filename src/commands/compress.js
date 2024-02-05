import fs from "fs";
import zlib from "zlib";
import path from "path";
import { handlerError } from "../utils/handlerError.js";
export const compress = async (sourcePath, targetDirectory, curr) => {
  try {
    const fileName = path.basename(sourcePath);
    let fullTargetPath = targetDirectory;
    if (!path.isAbsolute(targetDirectory)) {
      fullTargetPath = path.join(curr, targetDirectory);
    }

    const destinationPath = path.join(fullTargetPath, `${fileName}.gz`);

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliCompress();
    readStream.on("error", (err) => {
      handlerError(err);
    });

    writeStream.on("error", (err) => {
      handlerError(err);
    });

    brotli.on("error", (err) => {
      handlerError(err);
    });
    readStream.pipe(brotli).pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(`File ${sourcePath} was compressed to ${destinationPath}`);
  } catch (error) {
    handlerError(error);
  }
};
