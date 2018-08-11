import { sql } from "../mysqldb";

const ClientModel = { 
  getClients: function(callback) {
    const SQLstmt = 'select id, name, full_name, compliance_dl, active, notes from clients';
    return sql().query(SQLstmt, callback);
  },

  getClientByID: function(id, callback){
    const SQLstmt = 'select id, name, full_name, compliance_dl, active, notes from clients where id=?';
    return sql().query(SQLstmt, [id], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addClient: function(client, callback){
    const SQLstmt = 'insert into clients'
      + ' (id, name, full_name, compliance_dl, active, notes, created_by, last_updated_by)'
      + ' values (?, ?, ?, ?, ?, ?, ?, ?)'
      + ' on duplicate key update name = ?, full_name = ?, compliance_dl = ?, active = ?, notes = ?, last_updated_by = ?';

    const values = [client.id, client.name, client.full_name, client.compliance_dl, client.active
      , client.notes, client.created_by, client.last_updated_by
      , client.name, client.full_name, client.compliance_dl, client.active
      , client.notes, client.last_updated_by];
    return sql().query(SQLstmt, values, callback);
  },

  deleteClient: function(id, callback){
    const SQLstmt = 'delete from clients where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateClient: function(client, callback){
    const SQLstmt = 'update clients set name = ?, full_name = ?, compliance_dl = ?, active = ?'
      + ', notes = ?, last_updated_by = ? where id = ?';
    const values = [client.name, client.full_name, client.compliance_dl, client.active
      , client.notes, client.last_updated_by, client.id];
    return sql().query(SQLstmt, values, callback);
  }
};

export default ClientModel;

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