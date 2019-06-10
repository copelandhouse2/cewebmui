import { sql } from "../mysqldb";

const UserModel = {
  getUsers: function(callback) {
    const SQLstmt = 'select id, username, auth_key, client_id, contact_id, role, approved from users';
    return sql().query(SQLstmt, callback);
  },

  getUserByID: function(id, callback){
    const SQLstmt = 'select id, username, auth_key, client_id, contact_id, role, approved from users where id=?';
    return sql().query(SQLstmt, [id], callback);
  },

  getUserByUsername: function(username, callback){
    const SQLstmt = 'select id, username, auth_key, client_id, contact_id, role, approved from users where username=?';
    return sql().query(SQLstmt, [username], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addUser: function(user, hashedPassword, callback){
    // console.log("In addUser", user)
    const SQLstmt = 'insert into users'
      + ' (id, username, auth_key, client_id, contact_id, role, approved, created_by, last_updated_by)'
      + ' values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      + ' on duplicate key update username = ?, auth_key = ?, client_id = ?, contact_id = ?, role = ?, approved = ?, last_updated_by = ?';

    const values = [user.id, user.email, hashedPassword, null, null, null, user.approved, 1, 1
      , user.email, hashedPassword, null, null, null, user.approved, 1];

    // const values = [user.id, user.email, user.password, user.client_id, user.contact_id
    //   , user.role, user.created_by, user.last_updated_by
    //   , user.username, user.auth_key, user.client_id, user.contact_id
    //   , user.role, user.last_updated_by];
    return sql().query(SQLstmt, values, callback);
  },

  deleteUser: function(id, callback){
    const SQLstmt = 'delete from users where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateUser: function(client, callback){
    const SQLstmt = 'update users... ';
    const values = [user.username, user.auth_key, user.client_id, user.contact_id
      , user.role, user.last_updated_by, user.id];
    return sql().query(SQLstmt, values, callback);
  }
};

export default UserModel;
