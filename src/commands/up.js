import path from "path";
export const up = async (currentDir) => {
  const newDir = path.resolve(currentDir.path, "../");

  currentDir.path = newDir;
};
