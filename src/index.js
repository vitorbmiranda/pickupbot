import { init as initDiscord } from "./discord/client.js";
import { init as initState } from "./state/state.js";

const main = async () => {
  initDiscord();
  await initState();
};

main();
