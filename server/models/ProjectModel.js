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

const ProjectModel = {
  getProjects: function(params, callback) {

    // Stripping the first character (:)
    Object.keys(params).forEach(key => params[key] = params[key].slice(0,5) === ':null'? '' : params[key].slice(1));

    // Pulling out the search parameters.  Initializing values array.
    const { pending, dateRange, enteredBy, jobNumber, address, requestedBy, client, city, subdivision, status } = params;
    let values = [];
    // console.log('ProjectModel params', pending, dateRange, enteredBy, jobNumber, address, requestedBy, client, city, subdivision, status);

    // Initiating the where clauses.
    let pendingClause = '', enteredByClause = '', jobNumberClause = '', addressClause = '', requestedByClause = ''
    , clientClause = '', cityClause = '', subdivisionClause = '', statusClause = '', dateRangeClause = '';

    // Based on search parameter, set the where clauses.
    if (enteredBy !== '' && enteredBy !== null) {
      enteredByClause = ' and s.user_id = ?';
      values.push(Number(enteredBy));
    };

    if (pending === 'true') {
      pendingClause = ' and s.status = "PENDING"';
    }
    else {
      if (jobNumber !== '' && jobNumber !== null) {
        jobNumberClause = ' and s.job_number = ?';
        values.push(Number(jobNumber));
      };
      if (address !== '' && address !== null) {
        addressClause = ' and s.address1 like ?';
        values.push('%'+address+'%');
      };
      if (requestedBy !== '' && requestedBy !== null) {
        requestedByClause = ' and s.contact_id = ?';
        values.push(Number(requestedBy));
      };
      if (client !== '' && client !== null && client !== 'null') {
        clientClause = ' and s.client_id = ?';
        values.push(Number(client));
      };
      if (city !== '' && client !== null) {
        cityClause = ' and s.city = ?';
        values.push(city);
      };
      if (subdivision !== '' && client !== null) {
        subdivisionClause = ' and s.subdivision = ?';
        values.push(subdivision);
      };
      if (status !== '' && status !== null) {
        statusClause = ' and s.project_status = ?'
        values.push(status);
      };
      if (dateRange !== '' && dateRange !== null) {
        const year = new Date().getFullYear();
        switch (dateRange) {
          case 'CURYEAR':
            dateRangeClause = ' and s.last_updated_date BETWEEN "?-01-01" AND "?-12-31"';
            values.push(Number(year));
            values.push(Number(year));
            break;
          case 'LASTYEAR':
            dateRangeClause = ' and s.last_updated_date BETWEEN "?-01-01" AND "?-12-31"';
            values.push(Number(year)-1);
            values.push(Number(year)-1);
            break;
          case 'ALLTIME':
            break;
          default:
            dateRangeClause = ' and s.last_updated_date >= NOW() - INTERVAL ? DAY';
            values.push(Number(dateRange));
          break;
        };
      };
    };
    let SQLstmt = `SELECT s.id, s.job_number, s.revision, s.revision_desc, s.client_id, s.user_id, s.contact_id, s.city, s.subdivision, s.address1, s.address2, s.phase, s.section
    , s.lot, s.block, s.fnd_height_fr, s.fnd_height_fl, s.fnd_height_rr, s.fnd_height_rl, s.plan_type, s.elevation, s.masonry, s.garage_type
    , s.garage_entry, s.garage_swing, s.garage_drop, s.garage_extension, s.covered_patio, s.bay_window, s.master_shower_drop
    , s.bath1_shower_drop, s.bath2_shower_drop, s.bath3_shower_drop, s.geo_lab, s.geo_report_num, date_format(s.geo_report_date, '%Y-%m-%d') geo_report_date
    , s.geo_pi, s.em_center, s.em_edge, s.ym_center, s.ym_edge, s.soil_notes, s.additional_options, s.comments, s.status, s.project_status, s.scope, s.classification, date_format(s.onboard_date, '%Y-%m-%d') onboard_date, date_format(s.start_date, '%Y-%m-%d') start_date
    , date_format(s.due_date, '%Y-%m-%d') due_date, date_format(s.final_due_date, '%Y-%m-%d') final_due_date, date_format(s.transmittal_date, '%Y-%m-%d') transmittal_date, s.main_contact, s.billing_contact, s.builder_contact, s.foundation_type, s.floor_type
    , s.roof_type, s.num_stories, s.square_footage, s.pita_factor, s.trello_list_id, l.name trello_list, s.trello_card_id, s.box_folder
    , s.created_by, s.last_updated_by, s.creation_date, s.last_updated_date
    , cl.name client, co.full_name requestor`
    + ' from projects s'
    + ' left join clients cl on s.client_id = cl.id'  // allowing client_id to be null
    + ' left join contacts co on s.contact_id = co.id'  // allowing contact_id to be null
    + ' left join lookups l on IFNULL(s.trello_list_id, \'\') = l.code'
    + ' where l.type = "TRELLO_LIST"'
    + enteredByClause  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
    + pendingClause
    + jobNumberClause
    + addressClause
    + requestedByClause
    + clientClause
    + cityClause
    + subdivisionClause
    + statusClause
    + dateRangeClause
    + ' order by job_number';

    // console.log('ProjectModel: SQL', SQLstmt, values);

    return sql().query(SQLstmt, values, callback);
  },

  getPendingProjects: function(userID, callback) {
    // const SQLstmt = 'select id, city, state_prov, country from cities';
    // let SQLstmt = 'SELECT s.*, cl.name client, co.full_name requestor'
    //   + ' from projects s'
    let SQLstmt = `SELECT s.id, s.job_number, s.revision, s.revision_desc, s.client_id, s.user_id, s.contact_id, s.city, s.subdivision, s.address1, s.address2, s.phase, s.section
    , s.lot, s.block, s.fnd_height_fr, s.fnd_height_fl, s.fnd_height_rr, s.fnd_height_rl, s.plan_type, s.elevation, s.masonry, s.garage_type
    , s.garage_entry, s.garage_swing, s.garage_drop, s.garage_extension, s.covered_patio, s.bay_window, s.master_shower_drop
    , s.bath1_shower_drop, s.bath2_shower_drop, s.bath3_shower_drop, s.geo_lab, s.geo_report_num, date_format(s.geo_report_date, '%Y-%m-%d') geo_report_date
    , s.geo_pi, s.em_center, s.em_edge, s.ym_center, s.ym_edge, s.soil_notes, s.additional_options, s.comments, s.status, s.project_status, s.scope, s.classification, date_format(s.onboard_date, '%Y-%m-%d') onboard_date, date_format(s.start_date, '%Y-%m-%d') start_date
    , date_format(s.due_date, '%Y-%m-%d') due_date, date_format(s.final_due_date, '%Y-%m-%d') final_due_date, date_format(s.transmittal_date, '%Y-%m-%d') transmittal_date, s.main_contact, s.billing_contact, s.builder_contact, s.foundation_type, s.floor_type
    , s.roof_type, s.num_stories, s.square_footage, s.pita_factor, s.trello_list_id, l.name trello_list, s.trello_card_id, s.box_folder
    , s.created_by, s.last_updated_by, s.creation_date, s.last_updated_date
    , cl.name client, co.full_name requestor`
      + ' from projects s'
      + ' left join clients cl on s.client_id = cl.id' // allowing client_id to be null
      + ' left join contacts co on s.contact_id = co.id' // allowing contact_id to be null
      + ' left join lookups l on IFNULL(s.trello_list_id, \'\') = l.code'
      + ' where s.user_id = ?'  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
      + ' and s.status = "PENDING"'
      + ' and l.type = "TRELLO_LIST"'
      + ' order by s.job_number';

    // console.log('ProjectModel: userID, SQL', userID, SQLstmt);
    return sql().query(SQLstmt, [userID], callback);
  },

  getDups: function(params, callback = null) {

    // Stripping the first character (:)
    Object.keys(params).forEach(key => params[key] = params[key].slice(0,5) === ':null'? '' : params[key].slice(1));

    // Pulling out the search parameters.  Initializing values array.
    const { test, address, subdivision, phase, section, block, lot } = params;
    let values = [];
    // console.log('ProjectModel params', pending, dateRange, enteredBy, jobNumber, address, requestedBy, client, city, subdivision, status);

    // Initiating the where clauses.  These will make it return 0
    let addressClause = '', lotClause = '';

    // Based on search parameter, set the where clauses.
    if (test === 'ADDRESS' && address) {
      addressClause = ' AND ( UPPER(s.address1) = UPPER(?) )';
      values.push(address);
    } else

    if (test === 'LOT' && subdivision && block && lot) {
      lotClause = ' AND ( subdivision = ? and block = ? and lot = ? )';
      values.push(subdivision, block, lot);
    }

    let SQLstmt = `SELECT s.id, s.job_number, s.revision, s.revision_desc, s.client_id, s.user_id, s.contact_id, s.city, s.subdivision, s.address1, s.address2, s.phase, s.section
    , s.lot, s.block, s.fnd_height_fr, s.fnd_height_fl, s.fnd_height_rr, s.fnd_height_rl, s.plan_type, s.elevation, s.masonry, s.garage_type
    , s.garage_entry, s.garage_swing, s.garage_drop, s.garage_extension, s.covered_patio, s.bay_window, s.master_shower_drop
    , s.bath1_shower_drop, s.bath2_shower_drop, s.bath3_shower_drop, s.geo_lab, s.geo_report_num, date_format(s.geo_report_date, '%Y-%m-%d') geo_report_date
    , s.geo_pi, s.em_center, s.em_edge, s.ym_center, s.ym_edge, s.soil_notes, s.additional_options, s.comments, s.status, s.project_status, s.scope, s.classification, date_format(s.onboard_date, '%Y-%m-%d') onboard_date, date_format(s.start_date, '%Y-%m-%d') start_date
    , date_format(s.due_date, '%Y-%m-%d') due_date, date_format(s.final_due_date, '%Y-%m-%d') final_due_date, date_format(s.transmittal_date, '%Y-%m-%d') transmittal_date, s.main_contact, s.billing_contact, s.builder_contact, s.foundation_type, s.floor_type
    , s.roof_type, s.num_stories, s.square_footage, s.pita_factor, s.trello_list_id, l.name trello_list, s.trello_card_id, s.box_folder
    , s.created_by, s.last_updated_by, s.creation_date, s.last_updated_date
    , cl.name client, co.full_name requestor`
    + ' from projects s'
    + ' left join clients cl on s.client_id = cl.id'  // allowing client_id to be null
    + ' left join contacts co on s.contact_id = co.id'  // allowing contact_id to be null
    + ' left join lookups l on IFNULL(s.trello_list_id, \'\') = l.code'
    + ' where l.type = "TRELLO_LIST"'
    + addressClause  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
    + lotClause
    + ' order by job_number';

    // console.log('ProjectModel: SQL', SQLstmt, values);

    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      console.log('Model getDups: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  getProjectByID: function(id, callback = null){
    const SQLstmt = 'SELECT *'
      + ' from projects'
      + ' where id = ?';


    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, [id], callback);
    } else {
      // console.log('Model addProject: in the promise version');
      return sqlPromise(SQLstmt, [id]);

    }

  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addProject: function(start, callback = null){

  //inserting into mysql
  const {address_id, job_number, revision, revision_desc, client_id, client, owner_id, requestor_id, city, subdivision, address1, address2, phase, section, lot, block
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
    , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
    , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date
    , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status, scope, classification, onboard_date
    , start_date, due_date, final_due_date, transmittal_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
    , roof_type, num_stories, square_footage, pita_factor, trello_list_id, trello_card_id, box_folder
    , created_by, last_updated_by }
    = start;

  // console.log("start", start);
  // console.log("job_number", job_number);
  // console.log("city", city);
  // console.log("user_id", owner_id);
  // console.log('addProject: Values', values)

  // const SQLstmt = "INSERT INTO projects (job_number, client_id, user_id, city, subdivision, address1, address2, phase, section"
  // + ", lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type"
  // + ", garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop"
  // + ", bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date"
  // + ", geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, created_by, last_updated_by)"
  // + " VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?)";

  // 11+10+7+6+11+8+6+2 fields
  const SQLstmt = `INSERT INTO projects (id, job_number, revision, revision_desc, client_id, user_id, contact_id, city, subdivision, address1, address2, phase, section
  , lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date
  , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status, scope, classification, onboard_date
  , start_date, due_date, final_due_date, transmittal_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
  , roof_type, num_stories, square_footage, pita_factor, trello_list_id, trello_card_id, box_folder
  , created_by, last_updated_by)
   VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?)
   ON DUPLICATE KEY UPDATE job_number = ?, revision = ?, revision_desc = ?, client_id = ?, user_id = ?, contact_id = ?, city = ?, subdivision = ?, address1 = ?, address2 = ?
  , phase = ?, section = ?, lot = ?, block = ?, fnd_height_fr = ?, fnd_height_fl = ?, fnd_height_rr = ?, fnd_height_rl = ?
  , plan_type = ?, elevation = ?, masonry = ?, garage_type = ?, garage_entry = ?, garage_swing = ?, garage_drop = ?, garage_extension = ?
  , covered_patio = ?, bay_window = ?, master_shower_drop = ?, bath1_shower_drop = ?, bath2_shower_drop = ?, bath3_shower_drop = ?
  , geo_lab = ?, geo_report_num = ?,  geo_report_date = ?, geo_pi = ?, em_center = ?, em_edge = ?, ym_center = ?, ym_edge = ?, soil_notes = ?
  , additional_options = ?, comments = ?, status = ?, project_status = ?, scope = ?, classification = ?, onboard_date = ?, start_date = ?
  , due_date = ?, final_due_date = ?, transmittal_date = ?, main_contact = ?, billing_contact = ?, builder_contact = ?, foundation_type = ?, floor_type = ?
  , roof_type = ?, num_stories = ?, square_footage = ?, pita_factor = ?, trello_list_id = ?, trello_card_id = ?, box_folder = ?
  , last_updated_by = ?`;

  const values = [address_id, job_number, revision, revision_desc, client_id, owner_id, requestor_id, city, subdivision, address1, address2 // 11
  , phase, section, lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation // 10
  , masonry, garage_type, garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window // 8
  , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num  // 6
  , geo_report_date, geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status // 10
  , project_status, scope, classification, onboard_date, start_date, due_date, final_due_date, transmittal_date, main_contact // 9
  , billing_contact, builder_contact, foundation_type, floor_type, roof_type, num_stories, square_footage // 7
  , pita_factor, trello_list_id, trello_card_id, box_folder // 4
  , created_by, last_updated_by // 2

  , job_number, revision, revision_desc, client_id, owner_id, requestor_id, city, subdivision, address1, address2, phase, section, lot, block // 14
  , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type // 8
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop // 7
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date // 6
  , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status // 10
  , scope, classification, onboard_date, start_date, due_date, final_due_date, transmittal_date, main_contact, billing_contact, builder_contact // 10
  , foundation_type, floor_type, roof_type, num_stories, square_footage, pita_factor, trello_list_id, trello_card_id, box_folder // 9
  , last_updated_by // 1
  ];

    // console.log('Model addProject: SQL', SQLstmt);
    // console.log('Model addProject: Values', values);
    if (callback) {
      // console.log('Model addProject: in the callback version')
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Model addProject: in the promise version')
      return sqlPromise(SQLstmt, values);
    }

  },

  deleteProject: (id) => {
    const SQLstmt = "DELETE from projects where id = ?";
    const values = [id];
    return sqlPromise(SQLstmt, values);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  updateProject: function(city, callback){
    const SQLstmt = 'update projects set 1=1';
    const values = [];
    return sql().query(SQLstmt, values, callback);
  },

  commitProject: function(userID, callback) {
    const SQLstmt = 'update projects'
      + ' set status = ?'
      + ' where user_id = ?'
      + ' and status = ?';

    const values = ['ACTIVE', userID, 'PENDING'];
    // console.log('ProjectModel: userID, SQL', SQLstmt, values);
    return sql().query(SQLstmt, values, callback);
  },

  commitProjectByUser: (userID) => {
    const SQLstmt = 'update projects'
      + ' set status = ?'
      + ' where user_id = ?'
      + ' and status = ?';
    const values = ['ACTIVE', userID, 'PENDING'];

    return sqlPromise(SQLstmt, values);
  },

  commitProjectByID: (ID, cardID) => {
    const SQLstmt = 'update projects'
      + ' set status = ?, trello_card_id = ?'
      + ' where id = ?';
    const values = ['ACTIVE', cardID, ID];

    return sqlPromise(SQLstmt, values);
  },

};

export default ProjectModel;
