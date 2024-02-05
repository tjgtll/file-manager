import { createReadStream } from "fs";
import { createHash } from "crypto";

export const hash = async (filePath) => {
  try {
    const readStream = createReadStream(filePath);
    const hash = createHash("sha256");

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      console.log(`SHA256 Hash for file ${filePath}:`, hash.digest("hex"));
    });
  } catch (error) {}
};
