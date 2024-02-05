export const removeQuotes = (argsArr) => {
  const argsStr = argsArr.join(" ");
  const regex = /"([^"]+)"|'([^']+)'|(\S+)/g;
  let newArgsArr = [];
  let match;

  while ((match = regex.exec(argsStr)) !== null) {
    const arg = match[1] || match[2] || match[3];
    newArgsArr.push(arg);
  }

  return newArgsArr;
};
