import mysql from "mysql";
import async from "async";
import { env } from "./envVars";


const PROD_DB = "copelandeng";
const TEST_DB = "copelandeng_test";

export const TEST_MODE = 'TEST';
export const PROD_MODE = 'PROD';

const state = {
  pool: null,
  mode: null,
}

export const connect = (mode, done) => {
  state.pool = mysql.createPool({
    host: env.REACT_APP_HOST,
    user: env.REACT_APP_DBUSER,
    password: env.REACT_APP_DBPASSWORD,
    database: mode === PROD_MODE ? PROD_DB : TEST_DB
  });

  state.mode = mode;
  done();
}

export const sql = () => {
  return state.pool;
}

// export const fixtures = (data) => {
//   const pool = state.pool;
//   if (!pool) return done(new Error('Missing database connection.'));

//   const names = Object.keys(data.tables);
//   async.each(names, function(name, cb) {
//     async.each(data.tables[name], function(row, cb) {

//       const keys = Object.keys(row);
//       const values = keys.map(function(key) { return "'" + row[key] + "'" });

//       pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
//     }, cb);
//   }, done);
// }

// export const drop = function(tables, done) {

//   const pool = state.pool;
//   if (!pool) return done(new Error('Missing database connection.'));

//   async.each(tables, function(name, cb) {
//     pool.query('DELETE * FROM ' + name, cb);
//   }, done);
// }
