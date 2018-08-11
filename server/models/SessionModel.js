import { sql } from "../mysqldb";

const SessionModel = { 
 
getSession: function(username, callback) {

  const SQLstmt = 'select u.id, u.username, u.auth_key, true, u.contact_id, co.full_name, co.role, u.client_id, cl.name'
    + ' from users u, contacts co, clients cl'
    + ' where u.contact_id = co.id'
    + ' and u.client_id = cl.id'
    + ' and u.username = ?';

  // console.log("query", SQLstmt);

  return sql().query(SQLstmt, [username], callback);
}
 
};

export default SessionModel;

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