import { rm as deleteFile } from "fs/promises";

export const rm = async (filePath) => {
  try {
    await deleteFile(filePath);
    console.log(`${filePath} has been successfully deleted.`);
  } catch (error) {
    console.error(`Error deleting ${filePath}:`, error);
  }
};
