import { Client } from 'discord.js';
import { handleMessage } from '../msg/handler';
import { init as initHelper } from './helper';

let client = null;
let discordToken = null;

export const init = () => {
  client = new Client();
  discordToken = process.env.PICKUPBOT_DISCORD_TOKEN;
  if (!discordToken) {
    throw new Error('Missing env variable PICKUPBOT_DISCORD_TOKEN');
  }
  console.debug('Discord token loaded successfully from env variable');

  client.on('ready', () => {
    console.debug(`Logged in as ${client.user}!`);
  });

  client.on('message', (msg) => {
    handleMessage(msg);
  });

  client.login(discordToken);

  initHelper(client);
};
