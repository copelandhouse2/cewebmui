// const bcrypt = require("bcrypt-nodejs");
// import bcrypt from "bcrypt-nodejs";

// bcrypt-nodejs was deprecated.  Moved to bcrypt.
import bcrypt from 'bcrypt';

export function hash(word,err,done) {
  bcrypt.genSalt(10, function (saltErr, salt) {
    // console.log("the salt",salt);
    bcrypt.hash(word, salt, function (hashErr, hashedWord) {
      if (hashErr) {
        return err(hashErr);
      }
      return done(hashedWord);
    });
  });
}

export function compare(word,hashedWord,done) {
  bcrypt.compare(word, hashedWord,done);
}

// exports.hash = hash;
// exports.compare = compare;
