import { sql } from "../mysqldb";

const StartModel = { 
  getStarts: function(callback) {
    // const SQLstmt = 'select id, city, state_prov, country from cities';
    const SQLstmt = 'SELECT id, job_number, client_id, user_id, city, subdivision, address1, address2'
      + ' from starts';
    return sql().query(SQLstmt, callback);
  },

  getStartByID: function(id, callback){
    const SQLstmt = 'SELECT id, job_number, client_id, user_id, city, subdivision, address1, address2'
      + ' from starts'
      + ' where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addStart: function(start, callback){

  //inserting into mysql
  const { job_number, client_id, client, owner_id, city, subdivision, address1, address2, phase, section, lot, block
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
    , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
    , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, additional_options, comments, created_by, last_updated_by } = start;

  const values = [job_number, client_id, owner_id, city, subdivision, address1, address2, phase, section, lot, block
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
    , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
    , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, additional_options, comments, created_by, last_updated_by];

  // console.log("job_number", job_number);
  // console.log("city", city);
  // console.log("user_id", owner_id);

  const SQLstmt = "INSERT INTO starts (job_number, client_id, user_id, city, subdivision, address1, address2, phase, section"
  + ", lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type"
  + ", garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop"
  + ", bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, additional_options, comments, created_by, last_updated_by)"
  + " VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?)";

    return sql().query(SQLstmt, values, callback);
  },

  deleteStart: function(id, callback){
    const SQLstmt = "DELETE from starts where id = ?";
    // console.log("query", SQLstmt);
    return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateStart: function(city, callback){
    const SQLstmt = 'update starts set 1=1';
    const values = [];
    return sql().query(SQLstmt, values, callback);
  }
};

export default StartModel;
