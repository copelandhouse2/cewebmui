import { env } from '../envVars';

export const BoxModel = {
  CLIENT_ID: env.BOX_CLIENT_ID,
  SECRET: env.BOX_SECRET,
  authURL: 'https://account.box.com/api/oauth2/authorize',
  redirectURI: env.BOX_REDIRECT_URL,
  authTokenURL: 'https://api.box.com/oauth2/token',
  boxRedirectBrowser: env.BOX_REDIRECT_BROWSER,
};

export let client = {};
