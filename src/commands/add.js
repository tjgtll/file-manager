import { writeFile } from "fs/promises";
import path from "path";
import { handlerError } from "../utils/handlerError.js";
export const add = async (currentDir, fileName) => {
  try {
    const filePath = path.join(currentDir, fileName);
    await writeFile(filePath, "");
    console.log(`File '${fileName}' created successfully in '${currentDir}'.`);
    return filePath;
  } catch (error) {
    handlerError(error);
    return null;
  }
};
