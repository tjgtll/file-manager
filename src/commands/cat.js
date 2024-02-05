import fs from "fs";
import { handlerError } from "../utils/handlerError.js";
export const cat = async (filePath) => {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readStream.on("open", () => {
    console.log(`Contents of ${filePath}:`);
  });

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("error", (error) => {
    handlerError(error);
  });

  readStream.on("end", () => {
    console.log("\nEnd of file");
  });
};
