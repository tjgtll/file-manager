const args = process.argv.slice(2);
const usernameArgIndex = args.findIndex((arg) => arg.startsWith("--username="));
const username =
  usernameArgIndex !== -1 ? args[usernameArgIndex].split("=")[1] : "Unknown";

console.log(`Welcome to the File Manager, ${username}!`);
