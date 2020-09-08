import storage from "node-persist";
console.log(storage);

export const init = async () => {
  await storage.init();
  console.log(storage);
};

export const put = async (key, value) => {
  await storage.updateItem(key, value);
};

export const get = async (key) => {
  return await storage.getItem(key);
};
