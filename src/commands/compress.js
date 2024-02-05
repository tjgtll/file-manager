import fs from "fs";
import zlib from "zlib";
import path from "path";
export const compress = async (sourcePath, destinationDirectory) => {
  try {
    const fileName = path.basename(sourcePath);
    const destinationPath = path.join(destinationDirectory, `${fileName}.gz`);
    console.log(destinationPath);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(`File ${sourcePath} was compressed to ${destinationPath}`);
  } catch (error) {
    console.error("Error compressing file:", error);
  }
};
