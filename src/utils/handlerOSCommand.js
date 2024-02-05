import os from "os";

export const handlerOSCommand = async (args) => {
  switch (args[0]) {
    case "--EOL":
      console.log(`System End-Of-Line (EOL): ${os.EOL}`);
      break;
    case "--cpus":
      console.log("CPU Information:", os.cpus());
      break;
    case "--homedir":
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`Current system user: ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`Node.js binary architecture: ${os.arch()}`);
      break;
    default:
      console.log("Invalid OS args");
      break;
  }
};
