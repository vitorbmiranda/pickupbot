import * as State from "../state/state.js";
import { ROLES } from "../discord/roles.js";
import {
  sendMessageToChannel,
  sendEmbeddedMessageToChannel,
  replyMessage,
} from "./mensager.js";
import { getUserFromClient } from "../discord/client.js";

const STATE_PICKUP_PLAYERS = "pickup.players";

const add = async (msg) => {
  const pickupPlayers = await getPickupPlayers();
  if (pickupPlayers.indexOf(msg.author.id) !== -1) {
    replyMessage(msg, "you're already added to pickup, fucktard");
  } else {
    pickupPlayers.push(String(msg.author.id));
    await State.put(STATE_PICKUP_PLAYERS, pickupPlayers);
    sendCurrentPickupStatusMessage();
  }
};

const remove = async (msg) => {
  let pickupPlayers = await getPickupPlayers();
  pickupPlayers = pickupPlayers.filter(
    (player) => player != String(msg.author.id)
  );
  await State.put(STATE_PICKUP_PLAYERS, pickupPlayers);
  sendCurrentPickupStatusMessage();
};

const pickup = () => {
  sendCurrentPickupStatusMessage();
};

const getPickupPlayers = async () =>
  (await State.get(STATE_PICKUP_PLAYERS)) || [];

const sendCurrentPickupStatusMessage = async () => {
  const pickupPlayers = await getPickupPlayers();

  if (pickupPlayers.length == 0) {
    sendMessageToChannel("Pickup is empty");
    return;
  }

  let finalMsg = "";

  pickupPlayers.forEach((userId) => {
    const user = getUserFromClient(userId);
    finalMsg += "\n" + user.toString();
  });

  sendEmbeddedMessageToChannel(
    "#2ecc71",
    "bla",
    finalMsg,
    "https://imgur.com/byEIU8T.png"
  );
};

export default {
  add: {
    fn: add,
    roles: [ROLES.TEST],
  },
  remove: {
    fn: remove,
    roles: [ROLES.TEST],
  },
  pickup: {
    fn: pickup,
    roles: [ROLES.TEST, ROLES.EVERYONE],
  },
};
