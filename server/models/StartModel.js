import { sql } from "../mysqldb";

const StartModel = {
  getStarts: function(callback) {
    let SQLstmt = `SELECT s.id, s.job_number, s.client_id, s.user_id, s.contact_id, s.city, s.subdivision, s.address1, s.address2, s.phase, s.section
    , s.lot, s.block, s.fnd_height_fr, s.fnd_height_fl, s.fnd_height_rr, s.fnd_height_rl, s.plan_type, s.elevation, s.masonry, s.garage_type
    , s.garage_entry, s.garage_swing, s.garage_drop, s.garage_extension, s.covered_patio, s.bay_window, s.master_shower_drop
    , s.bath1_shower_drop, s.bath2_shower_drop, s.bath3_shower_drop, s.geo_lab, s.geo_report_num,  date_format(s.geo_report_date, '%y-%m-%d') geo_report_date
    , s.geo_pi, s.em_center, s.em_edge, s.ym_center, s.ym_edge, s.additional_options, s.comments, s.status, s.project_status, s.scope, date_format(s.design_date, '%Y-%m-%d') design_date
    , s.start_date, s.onboard_date, s.orig_due_date, s.main_contact, s.billing_contact, s.builder_contact, s.foundation_type, s.floor_type
    , s.roof_type, s.num_stories, s.square_footage, s.pita_factor, s.trello_list_id, l.name trello_list, s.box_folder
    , s.created_by, s.last_updated_by, s.creation_date, s.last_updated_date`
      + ', cl.name client, co.full_name requestor'
      + ' from starts s'
      + ' left join clients cl on s.client_id = cl.id'  // allowing client_id to be null
      + ' left join contacts co on s.contact_id = co.id';  // allowing contact_id to be null
      + ' left join lookups l on s.trello_list_id = l.code'
      + ' where l.type = "TRELLO_LIST"'
      + ' order by job_number';
    // console.log('StartModel: SQL', SQLstmt);
    return sql().query(SQLstmt, callback);
  },

  getPendingStarts: function(userID, callback) {
    // const SQLstmt = 'select id, city, state_prov, country from cities';
    // let SQLstmt = 'SELECT s.*, cl.name client, co.full_name requestor'
    //   + ' from starts s'
    let SQLstmt = `SELECT s.id, s.job_number, s.client_id, s.user_id, s.contact_id, s.city, s.subdivision, s.address1, s.address2, s.phase, s.section
    , s.lot, s.block, s.fnd_height_fr, s.fnd_height_fl, s.fnd_height_rr, s.fnd_height_rl, s.plan_type, s.elevation, s.masonry, s.garage_type
    , s.garage_entry, s.garage_swing, s.garage_drop, s.garage_extension, s.covered_patio, s.bay_window, s.master_shower_drop
    , s.bath1_shower_drop, s.bath2_shower_drop, s.bath3_shower_drop, s.geo_lab, s.geo_report_num, date_format(s.geo_report_date, '%Y-%m-%d') geo_report_date
    , s.geo_pi, s.em_center, s.em_edge, s.ym_center, s.ym_edge, s.additional_options, s.comments, s.status, s.project_status, s.scope, date_format(s.design_date, '%Y-%m-%d') design_date
    , date_format(s.start_date, '%Y-%m-%d') start_date, date_format(s.onboard_date, '%Y-%m-%d') onboard_date, date_format(s.orig_due_date, '%Y-%m-%d') orig_due_date, s.main_contact, s.billing_contact, s.builder_contact, s.foundation_type, s.floor_type
    , s.roof_type, s.num_stories, s.square_footage, s.pita_factor, s.trello_list_id, l.name trello_list, s.box_folder
    , s.created_by, s.last_updated_by, s.creation_date, s.last_updated_date`
      + ', cl.name client, co.full_name requestor'
      + ' from starts s'
      + ' left join clients cl on s.client_id = cl.id' // allowing client_id to be null
      + ' left join contacts co on s.contact_id = co.id' // allowing contact_id to be null
      + ' left join lookups l on s.trello_list_id = l.code'
      + ' where s.user_id = ?'  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
      + ' and s.status = "PENDING"'
      + ' and l.type = "TRELLO_LIST"'
      + ' order by s.job_number';

    // console.log('StartModel: userID, SQL', userID, SQLstmt);
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
    , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, project_status, scope, design_date
    , start_date, onboard_date, orig_due_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
    , roof_type, num_stories, square_footage, pita_factor, trello_list_id, box_folder
    , created_by, last_updated_by }
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

  // 11+10+7+6+11+8+6+2 fields
  const SQLstmt = `INSERT INTO starts (id, job_number, client_id, user_id, contact_id, city, subdivision, address1, address2, phase, section
  , lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date
  , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, project_status, scope, design_date
  , start_date, onboard_date, orig_due_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
  , roof_type, num_stories, square_footage, pita_factor, trello_list_id, box_folder
  , created_by, last_updated_by)
   VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?)
   ON DUPLICATE KEY UPDATE job_number = ?, client_id = ?, user_id = ?, contact_id = ?, city = ?, subdivision = ?, address1 = ?, address2 = ?
  , phase = ?, section = ?, lot = ?, block = ?, fnd_height_fr = ?, fnd_height_fl = ?, fnd_height_rr = ?, fnd_height_rl = ?
  , plan_type = ?, elevation = ?, masonry = ?, garage_type = ?, garage_entry = ?, garage_swing = ?, garage_drop = ?, garage_extension = ?
  , covered_patio = ?, bay_window = ?, master_shower_drop = ?, bath1_shower_drop = ?, bath2_shower_drop = ?, bath3_shower_drop = ?
  , geo_lab = ?, geo_report_num = ?,  geo_report_date = ?, geo_pi = ?, em_center = ?, em_edge = ?, ym_center = ?, ym_edge = ?
  , additional_options = ?, comments = ?, status = ?, project_status = ?, scope = ?, design_date = ?, start_date = ?
  , onboard_date = ?, orig_due_date = ?, main_contact = ?, billing_contact = ?, builder_contact = ?, foundation_type = ?, floor_type = ?
  , roof_type = ?, num_stories = ?, square_footage = ?, pita_factor = ?, trello_list_id = ?, box_folder = ?
  , last_updated_by = ?`;

  const values = [address_id, job_number, client_id, owner_id, requestor_id, city, subdivision, address1, address2 // 9
  , phase, section, lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation // 10
  , masonry, garage_type, garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window // 8
  , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num  // 6
  , geo_report_date, geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status // 9
  , project_status, scope, design_date, start_date, onboard_date, orig_due_date, main_contact // 7
  , billing_contact, builder_contact, foundation_type, floor_type, roof_type, num_stories, square_footage // 7
  , pita_factor, trello_list_id, box_folder // 3
  , created_by, last_updated_by // 2

  , job_number, client_id, owner_id, requestor_id, city, subdivision, address1, address2, phase, section, lot, block // 12
  , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type // 8
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop // 7
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date // 6
  , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, project_status // 9
  , scope, design_date, start_date, onboard_date, orig_due_date, main_contact, billing_contact, builder_contact // 8
  , foundation_type, floor_type, roof_type, num_stories, square_footage, pita_factor, trello_list_id, box_folder // 8
  , last_updated_by // 1
  ];


    // console.log('Model addStart: SQL', SQLstmt);
    // console.log('Model addStart: Values', values);

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
    // console.log('StartModel: userID, SQL', SQLstmt, values);
    return sql().query(SQLstmt, values, callback);
  }
};

export default StartModel;
