import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_CLIENT_SELECT = `SELECT id, id code, name, name client, name client_name
, full_name, full_name client_full_name, billing_address1, billing_address2
, billing_city, billing_state_prov, billing_zipcode, billing_country
, compliance_dl, active, notes comments
FROM clients
WHERE 1=1`;

const ClientModel = {
  getClients: function(callback = null) {
    // const SQLstmt = 'select id, id code, name, name client, full_name, compliance_dl, active, notes from clients';
    const SQLstmt = SQL_CLIENT_SELECT;
    const values = [];
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getClientByID: function(id, callback){
    const SQLstmt = 'select id, id code, name, name client, full_name, compliance_dl, active, notes from clients where id=?';
    return sql().query(SQLstmt, [id], callback);
  },

  findClients: (params) => {
    const { findString } = params;
    let values = [];
    let findClause = ''

    // console.log('findClients', findString);
    if (findString) {
      // console.log('findClients inside if', findString);
      findClause = ` and CONCAT_WS( '~', id, name, full_name
      , billing_address1, billing_city, billing_state_prov, billing_zipcode)
       like ?`;
      values.push('%'+findString+'%');
    }

    let SQLstmt = SQL_CLIENT_SELECT
    + findClause
    + ' order by id';

    return sqlPromise(SQLstmt, values);
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

  save: function(client, callback = null){

    const { id, name, client_name, full_name, client_full_name
    , billing_address1, billing_address2, billing_city
    , billing_state_prov, billing_zipcode, billing_country
    , compliance_dl, active, notes, created_by, last_updated_by }
    = client;

    const SQLstmt = `INSERT into clients
      (id, name, full_name, billing_address1, billing_address2, billing_city
      , billing_state_prov, billing_zipcode, billing_country
      , compliance_dl, active, notes, created_by, last_updated_by)
      VALUES (?,?,?,?,?,?,?,?,?,?,   ?,?,?,?)
      ON DUPLICATE KEY UPDATE name = ?, full_name = ?, billing_address1 = ?
      , billing_address2 = ?, billing_city = ?, billing_state_prov = ?
      , billing_zipcode = ?, billing_country = ?, compliance_dl = ?
      , active = ?, notes = ?, last_updated_by = ?`;

    const values = [id, client_name?client_name:name, client_full_name?client_full_name:full_name
      , billing_address1, billing_address2
      , billing_city, billing_state_prov, billing_zipcode, billing_country
      , compliance_dl, active, notes, created_by, last_updated_by
      , client_name?client_name:name, client_full_name?client_full_name:full_name
      , billing_address1, billing_address2, billing_city
      , billing_state_prov, billing_zipcode, billing_country
      , compliance_dl, active, notes, last_updated_by];

    // return sql().query(SQLstmt, values, callback);
    return sqlPromise(SQLstmt, values);

  },

  deleteClient: function(id, callback = null){
    const SQLstmt = 'DELETE from clients where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('delete Client promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }

    // return sql().query(SQLstmt, [id], callback);
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
