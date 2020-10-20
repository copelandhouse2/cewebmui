import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_SUB_SELECT = `SELECT s.id, s.id code, s.subdivision, s.subdivision name
  , s.subdivision subdivision_name, s.city_id, c.city
  FROM subdivisions s
  LEFT JOIN cities c on s.city_id = c.id
  WHERE 1=1`;

const SubdivisionModel = {
  getSubdivisions: function(callback = null) {
    // const SQLstmt = 'select id, id code, name, name client, full_name, compliance_dl, active, notes from clients';
    const SQLstmt = SQL_SUB_SELECT;
    const values = [];
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getSubdivisionByID: function(id, callback = null){
    let SQLstmt = SQL_SUB_SELECT
    + ' and s.id = ?';

    const values = [];
    values.push(id);

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  findSubdivisions: (params) => {
    const { findString } = params;
    let values = [];
    let findClause = ''

    // console.log('findSubdivisions', findString);
    if (findString) {
      // console.log('findSubdivisions inside if', findString);
      findClause = ` and CONCAT_WS( '~', s.id, s.subdivision, c.city)
       like ?`;
      values.push('%'+findString+'%');
    }

    let SQLstmt = SQL_SUB_SELECT
    + findClause
    + ' order by s.id';

    return sqlPromise(SQLstmt, values);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addSubdivision: function(subdivision, callback){
    const SQLstmt = 'insert into subdivisions'
      + ' (id, subdivision, city_id, created_by, last_updated_by)'
      + ' values(?, ?, ?, ?, ?)'
      + ' on duplicate key update subdivision = ?, city_id = ?, last_updated_by = ?';
    const values = [subdivision.id, subdivision.subdivision, subdivision.city_id, subdivision.created_by, subdivision.last_updated_by,
      subdivision.subdivision, subdivision.city_id, subdivision.last_updated_by];
    return sql().query(SQLstmt, values, callback);
  },

  save: function(sub, callback = null){
    // console.log('save sub function', sub);

    const { id, subdivision, subdivision_name, city_id, created_by
      , last_updated_by } = sub;

    const SQLstmt = `INSERT into subdivisions
      (id, subdivision, city_id, created_by, last_updated_by)
      VALUES(?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE subdivision = ?, city_id = ?, last_updated_by = ?`;

    const values = [id, subdivision_name?subdivision_name:subdivision, city_id
      , created_by, last_updated_by, subdivision_name?subdivision_name:subdivision
      , city_id, last_updated_by];


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

    const SQLstmt = 'DELETE from subdivisions where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      return sqlPromise(SQLstmt, values);
    }

  },

};

export default SubdivisionModel;

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
