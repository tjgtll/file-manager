import fs from "fs";
import zlib from "zlib";
import path from "path";
export const decompress = async (sourcePath, destinationDirectory) => {
  try {
    const fileName = path.basename(sourcePath);

    const destinationPath = path.join(
      destinationDirectory,
      fileName.slice(0, -3)
    );

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(`File ${sourcePath} was decompressed to ${destinationPath}`);
  } catch (error) {
    console.error("Error decompressing file:", error);
  }
};
