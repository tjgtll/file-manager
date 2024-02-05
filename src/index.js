import readline from "readline";

const args = process.argv.slice(2);
const usernameArgIndex = args.findIndex((arg) => arg.startsWith("--username="));
const username =
  usernameArgIndex !== -1 ? args[usernameArgIndex].split("=")[1] : "Unknown";
const start = async () => {
  const args = process.argv.slice(2);
  const username =
    args.length > 0 && args[0].startsWith("--username")
      ? args[0].split("=")[1]
      : "Mystery Explorer";

  console.log(`Welcome to the File Manager, ${username}!`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on("line", (line) => {}).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  });
};

start();
