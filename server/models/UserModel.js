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

const SQL_USER_SELECT = `SELECT u.id, u.id code, u.username, u.auth_key, u.approved
, c.id contact_id, c.client_id, c.first_name, c.last_name, c.full_name
, c.full_name name, c.initials, c.email, c.mobile, c.other, c.requestor, c.role, c.active
, c.notes
FROM users u, contacts c
WHERE u.id = c.user_id`;

// Old select statement
// const SQL_USER_SELECT = `select u.id, u.username, u.auth_key, u.client_id, u.contact_id
//   , u.role, u.approved from users u`;

// const SQLstmt = 'select u.id, u.username, u.auth_key, u.approved
//   +', true authenticated, co.id contact_id, co.first_name, co.full_name'
//   +', co.role, cl.id client_id, cl.name'
//   + ' from users u'
//   + ' left join contacts co on co.user_id = u.id'
//   + ' left join clients cl on co.client_id = cl.id'
//   + ' where u.username = ?';


const SQL_SETTINGS_SELECT = `SELECT id, user_id, accent_color from users_settings`;

const SQL_PREFERENCES_SELECT = `SELECT id, user_id, attributes
  FROM preferences
  WHERE isnull(user_id) or user_id = ?
  `;

const UserModel = {
  getUsers: function(callback) {
    const SQLstmt = SQL_USER_SELECT;
    return sql().query(SQLstmt, callback);
  },

  getUserByID: function(id, callback){
    const SQLstmt = SQL_USER_SELECT
      + ' and u.id=?';
    return sql().query(SQLstmt, [id], callback);
  },

  getUserByUsername: function(username, callback){
    const SQLstmt = SQL_USER_SELECT
      + ' and u.username=?';
    return sql().query(SQLstmt, [username], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addUser: function(user, hashedPassword, callback){
    console.log("In addUser", user)
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
  },

  getSettings: function(userID, callback = null) {

    let SQLstmt = SQL_SETTINGS_SELECT
    + ' where user_id = ?';

    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, [userID], callback);
    } else {
      // console.log('Model addProject: in the promise version');
      return sqlPromise(SQLstmt, [userID]);
    }
  },

  updateSettings: function(userID, settings, callback = null) {

    // console.log('updateSettings', userID, settings);

    const { id, accent_color, created_by, last_updated_by} = settings;

    const SQLstmt = `insert into users_settings
      (id, user_id, accent_color, created_by, last_updated_by)
      values (?, ?, ?, ?, ?)
      on duplicate key update user_id = ?, accent_color = ?, last_updated_by = ?`;

    const values = [id, userID, accent_color, created_by, last_updated_by
      , userID, accent_color, last_updated_by
    ];

    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('UserModel updateSettings', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },

  getPreferences: function(userID, callback = null) {

    let SQLstmt = SQL_PREFERENCES_SELECT;

    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, [userID], callback);
    } else {
      // console.log('Model addProject: in the promise version');
      return sqlPromise(SQLstmt, [userID]);
    }
  },

  updatePreferences: function(user_id, preferences, callback = null) {

    console.log('updatePreferences', user_id, preferences);

    const {id, updatedKey, value} = preferences;

    const attr = JSON.stringify({[updatedKey]: value});
    console.log('updatePreferences', attr);

    const SQLstmt = `insert into preferences
      (id, user_id, attributes, created_by, last_updated_by)
      values (?, ?, ?, ?, ?)
      on duplicate key update attributes = JSON_MERGE_PATCH(attributes, ?), last_updated_by = ?`;

    const values = [id, user_id, attr, user_id, user_id
      , attr, user_id ];

    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('UserModel updateSettings', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  }

};

export default UserModel;
