import storage from 'node-persist';

export const init = async () => {
  await storage.init();
};

export const put = async (key, value) => {
  await storage.updateItem(key, value);
};

export const get = async (key) => storage.getItem(key);
