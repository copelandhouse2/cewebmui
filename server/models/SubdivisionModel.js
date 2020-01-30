import { sql } from "../mysqldb";

const SubdivisionModel = {
  getSubdivisions: function(callback) {
    const SQLstmt = 'select s.id, s.id code, s.subdivision, s.subdivision name, s.city_id, c.city'
     + ' from subdivisions s'
     + ' left join cities c on s.city_id = c.id';
    return sql().query(SQLstmt, callback);
  },

  getSubdivisionByID: function(id, callback){
    const SQLstmt = 'select s.id, s.id code, s.subdivision, s.city_id, c.city'
     + ' from subdivisions s'
     + ' left join cities c on s.city_id = c.id'
     + ' where s.id = ?';
    return sql().query(SQLstmt, [id], callback);
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

  deleteSubdivision: function(id, callback){
    const SQLstmt = 'delete from subdivisions where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateSubdivision: function(subdivision, callback){
    const SQLstmt = 'update subdivisions set subdivision = ?, city_id = ?, last_updated_by = ? where id = ?';
    const values = [subdivision.subdivision, subdivision.city_id, subdivision.last_updated_by, subdivision.id];
    return sql().query(SQLstmt, values, callback);
  }
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
