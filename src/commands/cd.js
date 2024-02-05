import path from "path";
import { access, constants } from "fs/promises";

export const cd = async (currentDir, destination) => {
  try {
    const newDir = path.resolve(currentDir, destination);
    await access(newDir, constants.R_OK | constants.W_OK);
    return newDir;
  } catch (error) {
    return null;
  }
};
