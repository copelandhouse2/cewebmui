import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_CITY_SELECT = `SELECT c.id, c.id code, c.city, c.city name
  , c.city city_name, c.state_prov, l1.name state_prov_long
  , c.country, l2.name country_long
  FROM cities c
  LEFT JOIN lookups l1 on c.state_prov = l1.code
  LEFT JOIN lookups l2 on c.country = l2.code
  WHERE 1=1`;

const CityModel = {
  getCities: function(callback = null) {
    // const SQLstmt = 'select id, city, state_prov, country from cities';
    const SQLstmt = SQL_CITY_SELECT
    + ' ORDER BY c.id';

    const values = [];
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getCityByID: function(id, callback = null){
    let SQLstmt = SQL_CITY_SELECT
    + ' and c.id = ?'
    + ' ORDER BY c.id';

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

  findCities: (params) => {
    const { findString } = params;
    let values = [];
    let findClause = ''

    // console.log('findCities', findString);
    if (findString) {
      // console.log('findCities inside if', findString);
      findClause = ` and CONCAT_WS( '~', c.id, c.city, c.state_prov
      , l1.name, c.country, l2.name) like ?`;
      values.push('%'+findString+'%');
    }

    let SQLstmt = SQL_CITY_SELECT
    + findClause
    + ' ORDER BY c.id';

    return sqlPromise(SQLstmt, values);
  },
  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addCity: function(city, callback){
    const SQLstmt = 'insert into cities'
      + ' (id, city, state_prov, country, created_by, last_updated_by)'
      + ' values(?, ?, ?, ?, ?, ?)'
      + ' on duplicate key update city = ?, state_prov = ?, country = ?, last_updated_by = ?';
    const values = [city.id, city.city, city.state_prov, city.country, city.created_by, city.last_updated_by,
      city.city, city.state_prov, city.country, city.last_updated_by];
    // console.log("City Obj", city);
    // console.log("SQL", SQLstmt)
    return sql().query(SQLstmt, values, callback);
  },

  save: function(theCity, callback = null){
    // console.log('save city function', theCity);

    const { id, city_name, state_prov, country, created_by, last_updated_by } = theCity;

    // console.log('save city id', id);

    const SQLstmt = 'INSERT into cities'
      + ' (id, city, state_prov, country, created_by, last_updated_by)'
      + ' VALUES(?, ?, ?, ?, ?, ?)'
      + ' ON DUPLICATE KEY UPDATE city = ?, state_prov = ?, country = ?, last_updated_by = ?';

    const values = [id, city_name, state_prov, country, created_by, last_updated_by,
      city_name, state_prov, country, last_updated_by];

    // return sql().query(SQLstmt, values, callback);
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },
  // deleteCity: function(id, callback){
  //   const SQLstmt = 'delete from cities where id = ?';
  //   return sql().query(SQLstmt, [id], callback);
  // },

  delete: function(id, callback = null){

    const SQLstmt = 'DELETE from cities where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('delete Sub promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }

  },
  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateCity: function(city, callback){
    const SQLstmt = 'update cities set city = ?, state_prov = ?, country = ?, last_updated_by = ? where id = ?';
    const values = [city.city, city.state_prov, city.country, city.last_updated_by, city.id];
    return sql().query(SQLstmt, values, callback);
  }
};

export default CityModel;

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
