// import app from '../index.js';  // this is the main app.
import { BoxModel, client } from "../models/BoxModel";
import BoxSDK from 'box-node-sdk';

const sdk = new BoxSDK({
  clientID: BoxModel.CLIENT_ID,
  clientSecret: BoxModel.SECRET
});

let user_id;

export const authenticate = async (req, res) => {
  try {

    user_id = req.params.id;
    console.log('box authenticate',req.params.id);

    // const string = `${BoxModel.authURL}?client_id=${BoxModel.CLIENT_ID}&redirect_uri=${BoxModel.redirectURI}&response_type=code`
    const auth_url = sdk.getAuthorizeURL({
      response_type: "code"
    });
    console.log('show box string', auth_url);
    // this call invokes Box auth.
    res.redirect(auth_url);

    // console.log("Box is connected ... \n\n");
    // console.log("Box is connected ... \n\n", request.params);

    // return response.json('Box Connection Success');
    // response.end();

  } catch (err) {
    console.log("Error connecting to Box ... \n\n", err);
    return res.json(err);
  }
}

export const getToken = async (req, res) => {

  console.log('Params sent', req.query.code)

  try {
    // getToken(req.query.code);
    const tokenInfo = await sdk.getTokensAuthorizationCodeGrant(req.query.code, null);
    // console.log('token info',tokenInfo);
    client[user_id] = sdk.getPersistentClient(tokenInfo);
    console.log('box token obj',client);
    // this call invokes the Browser router.
    res.redirect(`${BoxModel.boxRedirectBrowser}/${req.query.code}`);
  } catch (err) {
      console.log("Error getting Box Token", err);
  }

  // try {
  //   // Get the user object for the current user
  //   const currentUser = await client[req.query.code].users.get(client[req.query.code].CURRENT_USER_ID);
  //   console.log('Here is the current user record', currentUser);
  //   // return res.json(currentUser);
  //   res.redirect(`http://localhost:3101/boxauthcomplete/${req.query.code}`);
  // } catch (err) {
  //     console.log("Error getting the current user", err);
  // }


}
