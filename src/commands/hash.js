import { createReadStream } from "fs";
import { createHash } from "crypto";
import { handlerError } from "../utils/handlerError.js";
export const hash = async (filePath) => {
  try {
    const readStream = createReadStream(filePath);
    const hash = createHash("sha256");

    readStream.on("error", (err) => {
      handlerError(err);
    });

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      console.log(`SHA256 Hash for file ${filePath}:`, hash.digest("hex"));
    });
  } catch (err) {
    handlerError(err);
  }
};
