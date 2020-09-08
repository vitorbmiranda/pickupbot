import * as Utils from "./utils.js";
import PickupCommands from "./pickup.js";
import { isMemberAssignedToAnyOfRoles, ROLES } from "../discord/roles.js";
import { replyWithLackOfPermissions } from "./mensager.js";

const botCommands = Object.assign({}, PickupCommands);

console.log(botCommands);

export const handleMessage = (msg) => {
  const { content } = msg;
  console.log(content);

  if (content.startsWith("!")) {
    handleBotCommand(msg);
  } else {
    handleOtherMessages(msg);
  }
};

const handleBotCommand = (msg) => {
  const { content } = msg;

  // get the cmd without the trailing !
  const cmd = Utils.extractCommandNameFromString(content);

  // check if it's a valid command based on what we have here
  if (!botCommands[cmd]) {
    msg.reply(`Command not found: ${content}`);
    return;
  }

  // check if user has the role necessary to run the command
  if (!isMemberAssignedToAnyOfRoles(msg.member, botCommands[cmd].roles)) {
    replyWithLackOfPermissions(msg);
    return;
  }

  // if everything's good, run the command
  botCommands[cmd].fn(msg);
};

const handleOtherMessages = (msg) => {};
