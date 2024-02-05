import path from "path";
export const up = (startDirUrl) => {
  return path.resolve(startDirUrl, "../");
};
