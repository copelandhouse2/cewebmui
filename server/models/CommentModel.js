import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_COMMENT_SELECT = `SELECT c.id, c.parent_id, c.table, c.table_id
  , c.comments, c.created_by, c.last_updated_by, c.creation_date
  , c.last_updated_date, co.first_name, co.full_name, co.initials
  FROM comments c
  LEFT JOIN contacts co ON c.created_by = co.user_id
  WHERE 1=1`;

export const CommentModelSearchOnly = {
  getComments: (table, table_id) => CommentModel.getComments(table, table_id),
};

const CommentModel = {
  getComments: function(table, table_id, callback = null) {
    // const SQLstmt = 'select id, id code, name, name client, full_name, compliance_dl, active, notes from clients';
    let whereClause = ` AND c.table = ? and c.table_id = ?`
    let values = [table, table_id];

    const SQLstmt = SQL_COMMENT_SELECT
    + whereClause
    + ' order by creation_date desc, id desc';

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  save: function(com, callback = null){
    console.log('save com function', com);

    const { id, parent_id, table, table_id, comments, created_by
      , last_updated_by } = com;

    const SQLstmt = `INSERT into comments
      (id, parent_id, \`table\`, table_id, comments, created_by, last_updated_by)
      VALUES(?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE parent_id = ?, \`table\` = ?, table_id = ?
      , comments = ?, last_updated_by = ?`;

    const values = [id, parent_id, table, table_id, comments
      , created_by, last_updated_by, parent_id, table, table_id
      , comments, last_updated_by];

    // return sql().query(SQLstmt, values, callback);
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  delete: function(id, callback = null){

    const SQLstmt = 'DELETE from comments where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      return sqlPromise(SQLstmt, values);
    }

  },

};

export default CommentModel;

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
