import { writeFile } from "fs/promises";
import path from "path";

export const add = async (currentDir, fileName) => {
  try {
    const filePath = path.join(currentDir, fileName);
    await writeFile(filePath, "");
    console.log(`File '${fileName}' created successfully in '${currentDir}'.`);
    return filePath;
  } catch (error) {
    console.error("Error occurred while creating file:", error);
    return null;
  }
};
