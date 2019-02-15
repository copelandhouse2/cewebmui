import jwt from "jwt-simple";
import { env } from "../envVars";


export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, env.REACT_APP_SECRET);
}

export function decodeToken(token) {
  return jwt.decode(token, env.REACT_APP_SECRET);
}

// export default tokenForUser;
// exports.tokenForUser = tokenForUser;
