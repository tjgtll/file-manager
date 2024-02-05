import { rename } from "fs/promises";
import { handlerError } from "../utils/handlerError.js";
export const rn = async (oldPath, newPath) => {
  try {
    await rename(oldPath, newPath);
    console.log(`File renamed successfully from ${oldPath} to ${newPath}`);
  } catch (error) {
    handlerError(error);
  }
};
