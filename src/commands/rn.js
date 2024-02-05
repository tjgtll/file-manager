import { rename } from "fs/promises";

export const rn = async (oldPath, newPath) => {
  try {
    await rename(oldPath, newPath);
    console.log(`File renamed successfully from ${oldPath} to ${newPath}`);
  } catch (error) {
    console.error("Error occurred while renaming file:", error);
  }
};
