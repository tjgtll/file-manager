import fs from "fs";
import zlib from "zlib";
import path from "path";
import { handlerError } from "../utils/handlerError.js";
export const decompress = async (sourcePath, targetDirectory, curr) => {
  try {
    const fileName = path.basename(sourcePath);
    if (!fileName.endsWith(".gz")) {
      throw new Error("The source file is not a .gz file.");
    }
    let fullTargetPath = targetDirectory;
    if (!path.isAbsolute(targetDirectory)) {
      fullTargetPath = path.join(curr, targetDirectory);
    }

    const destinationPath = path.join(fullTargetPath, fileName.slice(0, -3));

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliDecompress();
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

    console.log(`File ${sourcePath} was decompressed to ${destinationPath}`);
  } catch (error) {
    handlerError(error);
  }
};
