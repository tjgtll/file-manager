import fs from "fs";

export const cat = async (filePath) => {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readStream.on("open", () => {
    console.log(`Contents of ${filePath}:`);
  });

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("error", (error) => {
    console.error(`Error reading file: ${error}`);
  });

  readStream.on("end", () => {
    console.log("\nEnd of file");
  });
};
