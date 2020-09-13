import { MessageEmbed } from 'discord.js';
import { getDefaultChannel } from '../discord/helper';

export const sendMessageToChannel = (content) => {
  getDefaultChannel().send(content);
};

export const sendEmbeddedMessageToChannel = (
  color,
  title,
  description,
  thumbnail,
) => {
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setThumbnail(thumbnail);

  sendMessageToChannel({ embed });
};

export const replyMessage = (msg, content) => {
  msg.reply(content);
};

export const replyWithLackOfPermissions = (msg) => {
  replyMessage(msg, "you don't have enough permissions to run that");
};
