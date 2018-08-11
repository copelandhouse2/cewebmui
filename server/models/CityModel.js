import { sql } from "../mysqldb";

const CityModel = { 
  getCities: function(callback) {
    // const SQLstmt = 'select id, city, state_prov, country from cities';
    const SQLstmt = 'select c.id, c.city, c.state_prov, l1.name state_prov_long, c.country, l2.name country_long'
      + ' from cities c'
      + ' left join lookups l1 on c.state_prov = l1.code'
      + ' left join lookups l2 on c.country = l2.code'
      + ' order by c.id';
    return sql().query(SQLstmt, callback);
  },

  getCityByID: function(id, callback){
    const SQLstmt = 'select id, city, state_prov, country'
      + ' from cities where id=?';
    return sql().query(SQLstmt, [id], callback);
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

  deleteCity: function(id, callback){
    const SQLstmt = 'delete from cities where id = ?';
    return sql().query(SQLstmt, [id], callback);
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