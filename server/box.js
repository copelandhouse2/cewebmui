import BoxSDK from 'box-node-sdk';
import { env } from "./envVars";


export const TEST = 'box';
export const PROD = 'box';

const boxID = env.REACT_APP_BOX_ID;
const boxSecret = env.REACT_APP_BOX_SECRET;
const boxApp = env.REACT_APP_BOX_APP

export let box=null;
export const bconnect = (mode, callback) => {
  console.log(boxID, boxSecret, boxApp);
  const sdk = new BoxSDK({
    clientID: boxID,
    clientSecret: boxSecret
  });

  const box = sdk.getBasicClient(boxApp);
  // console.log("trello inside tconnect", trello)
  callback();
}
