import { rm as deleteFile } from "fs/promises";
import { handlerError } from "../utils/handlerError.js";
export const rm = async (filePath) => {
  try {
    await deleteFile(filePath);
    console.log(`${filePath} has been successfully deleted.`);
  } catch (error) {
    handlerError(error);
  }
};
