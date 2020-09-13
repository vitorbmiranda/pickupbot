let client = null;

export const init = (discordClient) => {
  client = discordClient;
};

export const getUserFromClient = (userId) => client.users.cache.get(userId);

export const getDefaultChannel = () => client.channels.cache.find((e) => e.name === 'testbot');
