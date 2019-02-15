import { sql } from "../mysqldb";

const LookupModel = {

getLookupByType: function(lookupType, callback) {

  const SQLstmt = 'select id, type, code, name, description, \`key\`, attribute1, attribute2, attribute3'
    + ', attribute4, attribute5'
    + ' from lookups'
    + ' where type = ?'
    + ' order by name';

  // console.log("query", SQLstmt);

  return sql().query(SQLstmt, [lookupType], callback);
},

getLookupByCode: function(lookupType, lookupCode, callback) {

  const SQLstmt = 'select id, type, code, name, description, key, attribute1, attribute2, attribute3'
    + ', attribute4, attribute5'
    + ' from lookups'
    + ' where type = ?'
    + ' and code = ?';

  // console.log("query", SQLstmt);

  return sql().query(SQLstmt, [lookupType, lookupCode], callback);
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
