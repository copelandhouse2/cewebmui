import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      // console.log('resolve for sql query: ', response);
      resolve(response);
    });
  });
};

const SessionModel = {

getSession: function(username, callback = null) {

  const SQLstmt = 'select u.id, u.username, u.auth_key, u.approved, true authenticated, trello_token'
    + ', co.id contact_id, co.first_name, co.last_name, co.full_name, co.initials, co.role, cl.id client_id, cl.name'
    + ' from users u'
    + ' left join contacts co on co.user_id = u.id'
    + ' left join clients cl on co.client_id = cl.id'
    + ' where u.username = ?';

  // console.log("query", SQLstmt);
  if (callback) {
    return sql().query(SQLstmt, [username], callback);
  } else {
    return sqlPromise(SQLstmt, [username]);
  }

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
