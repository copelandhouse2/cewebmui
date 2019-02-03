// const jwt = require("jwt-simple");
import jwt from "jwt-simple";

export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.REACT_APP_SECRET);
}

export function decodeToken(token) {
  return jwt.decode(token, process.env.REACT_APP_SECRET);
}

// export default tokenForUser;
// exports.tokenForUser = tokenForUser;
