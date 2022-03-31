import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_LOOKUP = `SELECT id, type, code, name, description, \`key\`, \`order\`
, attribute1, attribute2, attribute3, attribute4, attribute5
FROM lookups
WHERE 1=1
AND isnull(disabled)`;

const ORDER_BY = ` order by \`order\`, name`;

const LookupModel = {

getLookupByType: function(lookupType, callback=null) {

  const whereClause = lookupType === 'ALL'? '' : ' AND type = ?'

  const SQLstmt = SQL_LOOKUP
  + whereClause
  + ORDER_BY;
  // console.log("query", SQLstmt);
  if (callback) {
    // console.log('getClients: in the callback version');
    return sql().query(SQLstmt, [lookupType], callback);
  } else {
    // console.log('getClients: in the promise version');
    return sqlPromise(SQLstmt, [lookupType]);
  }
},

getLookupByCode: function(lookupType, lookupCode, callback = null) {

  const SQLstmt = 'select id, type, code, name, description, key, \`order\`, attribute1, attribute2, attribute3'
    + ', attribute4, attribute5'
    + ' from lookups'
    + ' where type = ?'
    + ' and code = ?'
    + ' and isnull(disabled)'
    + ' order by \`order\`, name';

  // console.log("query", SQLstmt);
  if (callback) {
    // console.log('getClients: in the callback version');
    return sql().query(SQLstmt, [lookupType, lookupCode], callback);
  } else {
    // console.log('getClients: in the promise version');
    return sqlPromise(SQLstmt, [lookupType, lookupCode]);
  }
}

};

export default LookupModel;

// ,
// getTaskById: function(id, callback){
//   return db.query("select * from task where Id=?",[id],callback);
// },
// addTask: function(Task, callback){
//   return db.query("Insert into task values(?,?,?)",[Task.Id,Task.Title,Task.Status],callback);
// },
// deleteTask: function(id, callback){
//   return db.query("delete from task where Id=?",[id],callback);
// },
// updateTask: function(id, Task, callback){
//   return db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
// }
