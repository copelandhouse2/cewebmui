import Trello from "node-trello";
// import { env } from "./envVars";

export const TEST = "trello";
export const PROD = "trello";

const key = process.env.TRELLO_KEY;
const token = process.env.TRELLO_TOKEN;
console.log(key, token);

// Gives me a connected Trello object to import and use to perform Trello tasks
export let trello=null;

export const tconnect = (mode, callback) => {
  // console.log(key, token);

  trello = new Trello(key, token);

  // console.log("trello inside tconnect", trello)

  callback();
}

