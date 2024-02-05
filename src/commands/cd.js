import path from "path";
import { access, constants } from "fs/promises";

export const cd = async (currentDir, destination) => {
  try {
    const newDir = path.resolve(currentDir.path, destination);
    await access(newDir, constants.R_OK | constants.W_OK);
    currentDir.path = newDir;
  } catch (error) {
    return;
  }
};
