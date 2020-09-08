import { Client } from "discord.js";
import { handleMessage } from "../msg/handler.js";

let client = null;
let discordToken = null;

export const init = () => {
  client = new Client();
  discordToken = process.env.PICKUPBOT_DISCORD_TOKEN;
  if (!discordToken) {
    throw "Missing env variable PICKUPBOT_DISCORD_TOKEN";
  }
  console.debug("Discord token loaded successfully from env variable");

  client.on("ready", () => {
    console.debug(`Logged in as ${client.user}!`);
  });

  client.on("message", (msg) => {
    handleMessage(msg);
  });

  client.login(discordToken);
};

export const getUserFromClient = (userId) => {
  return client.users.cache.get(userId);
};

export const getDefaultChannel = () => {
  return client.channels.cache.find((e) => e.name == "testbot");
};
