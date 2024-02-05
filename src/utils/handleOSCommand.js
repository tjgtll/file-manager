import os from "os";

export const getEOL = () => {
  return os.EOL;
};

export const getCPUInfo = () => {
  return os.cpus();
};

export const getHomeDir = () => {
  return os.homedir();
};

export const getUsername = () => {
  return os.userInfo().username;
};

export const getArchitecture = () => {
  return os.arch();
};

export const handleOSCommand = async (args) => {
  console.log(args[0]);
  switch (args[0]) {
    case "--EOL":
      console.log(`System End-Of-Line (EOL): ${getEOL()}`);
      break;
    case "--cpus":
      console.log("CPU Information:", getCPUInfo());
      break;
    case "--homedir":
      console.log(`Home directory: ${getHomeDir()}`);
      break;
    case "--username":
      console.log(`Current system user: ${getUsername()}`);
      break;
    case "--architecture":
      console.log(`Node.js binary architecture: ${getArchitecture()}`);
      break;
    default:
      console.log("Invalid OS args");
      break;
  }
};
