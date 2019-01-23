import { sql } from "../mysqldb";

const StartModel = {
  getStarts: function(callback) {
    let SQLstmt = 'SELECT s.*, cl.name client, co.full_name requestor'
      + ' from starts s, clients cl, contacts co'
      + ' where s.client_id = cl.id'
      + ' and s.contact_id = co.id';
    // console.log('StartModel: SQL', SQLstmt);
    return sql().query(SQLstmt, callback);
  },

  getPendingStarts: function(userID, callback) {
    // const SQLstmt = 'select id, city, state_prov, country from cities';
    let SQLstmt = 'SELECT s.*, cl.name client, co.full_name requestor'
      + ' from starts s, clients cl, contacts co'
      + ' where s.client_id = cl.id'
      + ' and s.contact_id = co.id'
      + ' and s.user_id = ?'
      + ' and s.status = "PENDING"';

    console.log('StartModel: userID, SQL', userID, SQLstmt);
    return sql().query(SQLstmt, [userID], callback);
  },

  getStartByID: function(id, callback){
    const SQLstmt = 'SELECT *'
      + ' from starts'
      + ' where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addStart: function(start, callback){

  //inserting into mysql
  const {address_id, job_number, client_id, client, owner_id, requestor_id, city, subdivision, address1, address2, phase, section, lot, block
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
    , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
    , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date
    , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, created_by, last_updated_by }
    = start;

  // console.log("job_number", job_number);
  // console.log("city", city);
  // console.log("user_id", owner_id);
  // console.log('addStart: Values', values)

  // const SQLstmt = "INSERT INTO starts (job_number, client_id, user_id, city, subdivision, address1, address2, phase, section"
  // + ", lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type"
  // + ", garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop"
  // + ", bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date"
  // + ", geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, created_by, last_updated_by)"
  // + " VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?)";

  const SQLstmt = `INSERT INTO starts (id, job_number, client_id, user_id, contact_id, city, subdivision, address1, address2, phase, section
  , lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date
  , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, created_by, last_updated_by)
   VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?)
   ON DUPLICATE KEY UPDATE job_number = ?, client_id = ?, user_id = ?, contact_id = ?, city = ?, subdivision = ?, address1 = ?, address2 = ?
  , phase = ?, section = ?, lot = ?, block = ?, fnd_height_fr = ?, fnd_height_fl = ?, fnd_height_rr = ?, fnd_height_rl = ?
  , plan_type = ?, elevation = ?, masonry = ?, garage_type = ?, garage_entry = ?, garage_swing = ?, garage_drop = ?, garage_extension = ?
  , covered_patio = ?, bay_window = ?, master_shower_drop = ?, bath1_shower_drop = ?, bath2_shower_drop = ?, bath3_shower_drop = ?
  , geo_lab = ?, geo_report_num = ?,  geo_report_date = ?, geo_pi = ?, em_center = ?, em_edge = ?, ym_center = ?, ym_edge = ?
  , additional_options = ?, comments = ?, status = ?, last_updated_by = ?`;

  const values = [address_id, job_number, client_id, owner_id, requestor_id, city, subdivision, address1, address2
  , phase, section, lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation
  , masonry, garage_type, garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window
  , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num
  , geo_report_date, geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status
  , created_by, last_updated_by

  , job_number, client_id, owner_id, requestor_id, city, subdivision, address1, address2, phase, section, lot, block
  , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date
  , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, last_updated_by
  ];


    console.log('Model addStart: SQL', SQLstmt);
    console.log('Model addStart: Values', values);

    return sql().query(SQLstmt, values, callback);
  },

  deleteStart: function(id, callback){
    const SQLstmt = "DELETE from starts where id = ?";
    // console.log("query", SQLstmt, id);
    return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateStart: function(city, callback){
    const SQLstmt = 'update starts set 1=1';
    const values = [];
    return sql().query(SQLstmt, values, callback);
  },

  commitStart: function(userID, callback) {
    const SQLstmt = 'update starts'
      + ' set status = ?'
      + ' where user_id = ?';

    const values = ['ACTIVE', userID];
    console.log('StartModel: userID, SQL', SQLstmt, values);
    return sql().query(SQLstmt, values, callback);
  }
};

export default StartModel;
