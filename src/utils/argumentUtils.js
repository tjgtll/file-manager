export const processArgument = (argument) => {
  return argument.replace(/(^\"|\')|(\"|\'$)/g, "").trim();
};
