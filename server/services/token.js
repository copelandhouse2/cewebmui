// const jwt = require("jwt-simple");
import jwt from "jwt-simple";

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

export default tokenForUser;
// exports.tokenForUser = tokenForUser;

