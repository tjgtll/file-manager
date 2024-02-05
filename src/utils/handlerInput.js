export const handlerInput = (line) => {
  const commandArr = line.trim().split(" ");
  const command = commandArr[0];

  switch (command) {
    case "test":
      console.log("This is a test command");
      break;

    default:
      break;
  }
};
