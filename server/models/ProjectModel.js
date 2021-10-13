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

// interesting the prequery failed in test env.  Regarding distinct and order by...
// fields in order by must be selected when you have a distinct.
const SQL_PREQUERY = `SELECT DISTINCT p.id, p.job_number, p.last_updated_date`

// p.fnd_height_fr, p.fnd_height_fl, p.fnd_height_rr, p.fnd_height_rl, p.plan_type, p.elevation, p.masonry, p.garage_type
// , p.garage_entry, p.garage_swing, p.garage_drop, p.garage_extension, p.covered_patio, p.bay_window, p.master_shower_drop
// , p.bath1_shower_drop, p.bath2_shower_drop, p.bath3_shower_drop,


// p.additional_options, p.comments,


// p.foundation_type, p.floor_type
// , p.roof_type, p.num_stories, p.square_footage, p.pita_factor, p.dwelling_type,

const SQL_PROJECT_SELECT = `SELECT p.id, p.id address_id, p.job_number, p.story, p.revision, p.revision orig_rev, p.revision_desc, p.revision_desc orig_rev_desc, p.client_id, p.user_id, p.contact_id, p.city, p.subdivision, p.address1, p.address2, p.phase, p.section
, p.lot, p.block,    p.geo_lab, p.geo_report_num, date_format(p.geo_report_date, '%Y-%m-%d') geo_report_date
, p.geo_pi, p.em_center, p.em_edge, p.ym_center, p.ym_edge, p.soil_notes,   p.status, p.project_status, p.scope, p.classification, date_format(p.onboard_date, '%Y-%m-%d') onboard_date, date_format(p.start_date, '%Y-%m-%d') start_date
, date_format(p.due_date, '%Y-%m-%d') due_date, date_format(p.final_due_date, '%Y-%m-%d') final_due_date, date_format(p.transmittal_date, '%Y-%m-%d') transmittal_date, p.main_contact, p.billing_contact, p.builder_contact
  , p.trello_list_id, l.name trello_list, p.trello_card_id, p.box_folder
, p.created_by, p.last_updated_by, date_format(p.creation_date, '%Y-%m-%d') creation_date, date_format(p.last_updated_date, '%Y-%m-%d') last_updated_date
, cl.name client, co.full_name requestor, co2.full_name entered_by, c.id city_id, su.id subdivision_id`
// + ' from projects s'
// + ' left join clients cl on p.client_id = cl.id'  // allowing client_id to be null
// + ' left join contacts co on p.contact_id = co.id'  // allowing contact_id to be null
// + ' left join contacts co2 on p.user_id = co2.user_id'  // user id should NEVER be null
// + ' left join cities c on p.city = c.city'  // allowing city_id to be null
// + ' left join subdivisions su on p.subdivision = su.subdivision'  // allowing subdivision to be null
// + ' left join lookups l on IFNULL(p.trello_list_id, \'\') = l.code'
// + ' where l.type = "TRELLO_LIST"';

const SQL_TABLES = ' from projects p'
+ ' left join clients cl on p.client_id = cl.id'  // allowing client_id to be null
+ ' left join contacts co on p.contact_id = co.id'  // allowing contact_id to be null
+ ' left join contacts co2 on p.user_id = co2.user_id'  // user id should NEVER be null
+ ' left join cities c on p.city = c.city'  // allowing city_id to be null
+ ' left join subdivisions su on p.subdivision = su.subdivision'  // allowing subdivision to be null
+ ' left join lookups l on IFNULL(p.trello_list_id, \'\') = l.code'
+ ' where l.type = "TRELLO_LIST"';

const SQL_TABLES_SCOPE = ' from projects p'
+ ' left join clients cl on p.client_id = cl.id'  // allowing client_id to be null
+ ' left join contacts co on p.contact_id = co.id'  // allowing contact_id to be null
+ ' left join contacts co2 on p.user_id = co2.user_id'  // user id should NEVER be null
+ ' left join cities c on p.city = c.city'  // allowing city_id to be null
+ ' left join subdivisions su on p.subdivision = su.subdivision'  // allowing subdivision to be null
+ ' left join lookups l on IFNULL(p.trello_list_id, \'\') = l.code'
+ ' left join projects_scope ps on p.id = ps.project_id'
+ ' where l.type = "TRELLO_LIST"';

const ProjectModel = {
  getProjectsByArr: function(list, orderField = 'job_number', callback = null) {

    let values = [];
    let qMark = '';
    // console.log('getProjectsByArr: ', list);
    values = list.map(i=>i.id);
    // console.log('getProjectsByArr: ', values);
    values.forEach((id,i)=>{
      i===0? qMark='?' : qMark=qMark+',?';
    })

    const idFilter = ` and p.id IN (${qMark})`;
    // check the order field and set order by appropriately... Right now
    // default becomes job number
    const orderBy = orderField === 'last_updated_date'? ' order by p.last_updated_date desc':
    ' order by p.job_number';

    let SQLstmt = SQL_PROJECT_SELECT
    + SQL_TABLES
    + idFilter
    + orderBy;

    // console.log('getProjectsByArr: ', SQLstmt, values);
    if (callback) {
      // console.log('getProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getProjects: function(params, callback = null) {

    // Stripping the first character (:)
    Object.keys(params).forEach(key => params[key] = params[key].slice(0,5) === ':null'? '' : params[key].slice(1));

    // Pulling out the search parameters.  Initializing values array.
    const { pending, dateRange, enteredBy, jobNumber, address, requestedBy, client, city, subdivision, status, ver, filter } = params;
    let values = [];
    // console.log('ProjectModel params', pending, dateRange, enteredBy, jobNumber, address, requestedBy, client, city, subdivision, status, ver, filter);

    // Initiating the where clauses.
    let pendingClause = '', enteredByClause = '', jobNumberClause = '', addressClause = '', requestedByClause = ''
    , clientClause = '', cityClause = '', subdivisionClause = '', statusClause = '', dateRangeClause = '';

    // the default limit clause
    let limitClause = ' LIMIT 0, 200';

    // Based on search parameter, set the where clauses.
    if (enteredBy !== '' && enteredBy !== null) {
      enteredByClause = ' and p.user_id = ?';
      values.push(Number(enteredBy));
    };

    if (pending === 'true') {
      pendingClause = ' and p.status = "PENDING"';
    }
    else {
      if (jobNumber !== '' && jobNumber !== null) {
        jobNumberClause = ' and p.job_number = ?';
        values.push(Number(jobNumber));
      };
      if (address !== '' && address !== null) {
        addressClause = ' and p.address1 like ?';
        values.push('%'+address+'%');
      };
      if (requestedBy !== '' && requestedBy !== null) {
        requestedByClause = ' and p.contact_id = ?';
        values.push(Number(requestedBy));
      };
      if (client !== '' && client !== null && client !== 'null') {
        clientClause = ' and p.client_id = ?';
        values.push(Number(client));
      };
      if (city !== '' && client !== null) {
        cityClause = ' and p.city = ?';
        values.push(city);
      };
      if (subdivision !== '' && client !== null) {
        subdivisionClause = ' and p.subdivision = ?';
        values.push(subdivision);
      };
      if (status !== '' && status !== null) {
        statusClause = ' and p.project_status = ?'
        values.push(status);
      };
      if (dateRange !== '' && dateRange !== null) {
        const year = new Date().getFullYear();
        switch (dateRange) {
          case 'CURYEAR':
            dateRangeClause = ' and p.last_updated_date BETWEEN "?-01-01" AND "?-12-31"';
            values.push(Number(year));
            values.push(Number(year));
            break;
          case 'LASTYEAR':
            dateRangeClause = ' and p.last_updated_date BETWEEN "?-01-01" AND "?-12-31"';
            values.push(Number(year)-1);
            values.push(Number(year)-1);
            break;
          case 'ALLTIME':
            break;
          default:
            dateRangeClause = ' and p.last_updated_date >= NOW() - INTERVAL ? DAY';
            values.push(Number(dateRange));
          break;
        };
        // remove limit clause when date range provided.
        limitClause = '';
      };
    };

    let SQLstmt = SQL_PROJECT_SELECT
    + SQL_TABLES
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
    + ' order by p.job_number'
    + limitClause;

    // console.log('ProjectModel: SQL', SQLstmt, values);
    if (callback) {
      // console.log('getProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  searchProjects: function(params, callback = null) {

    // Stripping the first character (:)
    // console.log('searchProjects', params);
    // Object.keys(params).forEach(key => params[key] = params[key].slice(0,5) === ':null'? '' : params[key].slice(1));

    // Pulling out the search parameters.  Initializing values array.
    const { ver, enteredBy, filter, find } = params;
    let values = [];
    // console.log('ProjectModel params', ver, enteredBy, filter, find);

    // Initiating the where clauses.
    let pendingClause = '', enteredByClause = '', jobNumberClause = ''
    , addressClause = '', requestedByClause = '', clientClause = '', cityClause = ''
    , subdivisionClause = '', statusClause = '', dateRangeClause = ''
    , findClause = '', orderBy = '', andClause = '';

    let limitClause = ' LIMIT 0, 200';

    if (enteredBy) {
      // entered by is the "user_id" column on projects.  It maps to users.ID column
      // last_updated_by, created_by also map to users.ID
      // user_id and created_by are essentially the same field.  Should maybe fix that.
      // Making this change so recents shows the user who last touched the project
      // enteredByClause = ' and p.user_id = ?';
      enteredByClause = ' and p.last_updated_by = ?';

      values.push(Number(enteredBy));
    };

    if (filter) {
      switch (filter) {
        case 'U':
          statusClause = ' and p.status = ?'
          values.push('UNAPPROVED');
          break;
        case 'P':
          statusClause = ' and p.status = ?'
          values.push('PENDING');
          break;
        default:
          dateRangeClause = ' and p.last_updated_date >= NOW() - INTERVAL ? DAY';
          values.push(Number(filter));
        break;
      };
      orderBy = ' order by p.last_updated_date desc';  // changing to last updated date.
    }

    if (find) {
      const criteria = find.toLowerCase().split(' and ').map(e=>e.trim());

      // console.log('/*** criteria ***/', criteria);
      let val = '';
      criteria.forEach((e, i)=> {
        // const e = elementWithSpaces.trim();
        if (e.startsWith('job_number:')) { val = e.slice(11)+'%'; andClause = ` and p.job_number like ?`}
        else if (e.startsWith('job:')) { val = e.slice(4)+'%'; andClause = ` and p.job_number like ?`}
        else if (e.startsWith('story:')) { val = '%'+e.slice(6)+'%'; andClause = ` and p.story like ?`}

        else if (e.startsWith('revision:')) { val = e.slice(9); andClause = ` and p.revision = ?`}
        else if (e.startsWith('rev:')) { val = e.slice(4); andClause = ` and p.revision = ?`}
        else if (e.startsWith('revision_desc:')) { val = '%'+e.slice(14)+'%'; andClause = ` and p.revision_desc like ?`}
        else if (e.startsWith('rdesc:')) { val = '%'+e.slice(6)+'%'; andClause = ` and p.revision_desc like ?`}

        else if (e.startsWith('address:')) { val = '%'+e.slice(8)+'%'; andClause = ` and p.address1 like ?`}
        else if (e.startsWith('addr:')) { val = '%'+e.slice(5)+'%'; andClause = ` and p.address1 like ?`}
        else if (e.startsWith('city:')) { val = e.slice(5)+'%'; andClause = ` and p.city like ?`}
        else if (e.startsWith('subdivision:')) { val = '%'+e.slice(12)+'%'; andClause = ` and p.subdivision like ?`}
        else if (e.startsWith('sub:')) { val = '%'+e.slice(4)+'%'; andClause = ` and p.subdivision like ?`}
        else if (e.startsWith('phase:')) { val = e.slice(6); andClause = ` and p.phase = ?`}
        else if (e.startsWith('section:')) { val = e.slice(8); andClause = ` and p.section = ?`}
        else if (e.startsWith('sec:')) { val = e.slice(4); andClause = ` and p.section = ?`}
        else if (e.startsWith('lot:')) { val = e.slice(4); andClause = ` and p.lot = ?`}
        else if (e.startsWith('block:')) { val = e.slice(6); andClause = ` and p.block = ?`}

        else if (e.startsWith('client:')) { val = '%'+e.slice(7)+'%'; andClause = ` and cl.name like ?`}
        else if (e.startsWith('cli:')) { val = '%'+e.slice(4)+'%'; andClause = ` and cl.name like ?`}

        else if (e.startsWith('geo_lab:')) { val = e.slice(8)+'%'; andClause = ` and p.geo_lab like ?`}
        else if (e.startsWith('lab:')) { val = e.slice(4)+'%'; andClause = ` and p.geo_lab like ?`}
        else if (e.startsWith('geo_report_num:')) { val = e.slice(15)+'%'; andClause = ` and p.geo_report_num like ?`}
        else if (e.startsWith('grep:')) { val = e.slice(5)+'%'; andClause = ` and p.geo_report_num like ?`}
        else if (e.startsWith('geo_pi:')) { val = e.slice(7)+'%'; andClause = ` and p.geo_pi like ?`}
        else if (e.startsWith('pi:')) { val = e.slice(3)+'%'; andClause = ` and p.geo_pi like ?`}
        else if (e.startsWith('soil_notes:')) { val = '%'+e.slice(11)+'%'; andClause = ` and p.soil_notes like ?`}
        else if (e.startsWith('snote:')) { val = '%'+e.slice(6)+'%'; andClause = ` and p.soil_notes like ?`}

        else if (e.startsWith('creation_date:') && !isNaN(e.slice(13))) { val = e.slice(13); andClause = ` and p.creation_date >= NOW() - INTERVAL ? DAY`}
        else if (e.startsWith('cdate:') && !isNaN(e.slice(6))) { val = e.slice(6); andClause = ` and p.creation_date >= NOW() - INTERVAL ? DAY`}
        else if (e.startsWith('last_updated_date:') && !isNaN(e.slice(18))) { val = e.slice(18); andClause = ` and p.last_updated_date >= NOW() - INTERVAL ? DAY`}
        else if (e.startsWith('ldate:') && !isNaN(e.slice(6))) { val = e.slice(6); andClause = ` and p.last_updated_date >= NOW() - INTERVAL ? DAY`}
        // else if (!isNaN(e)) { val = e; andClause = ` and p.last_updated_date >= NOW() - INTERVAL ? DAY`}

        else if (e.startsWith('entered:')) { val = e.slice(8)+'%'; andClause = ` and co2.full_name like ?`}
        else if (e.startsWith('ent:')) { val = e.slice(4)+'%'; andClause = ` and co2.full_name like ?`}
        else if (e.startsWith('requested:')) { val = e.slice(10)+'%'; andClause = ` and co.full_name like ?`}
        else if (e.startsWith('req:')) { val = e.slice(4)+'%'; andClause = ` and co.full_name like ?`}
        else if (e.startsWith('status:')) { val = e.slice(7)+'%'; andClause = ` and p.status like ?`}

        // scope search
        else if (e.startsWith('scope:')) { val = e.slice(6)+'%'; andClause = ` and ps.scope like ?`}
        else if (e.startsWith('revision_desc_scope:')) { val = e.slice(20)+'%'; andClause = ` and ps.revision_desc like ?`}
        else if (e.startsWith('rdescs:')) { val = e.slice(7)+'%'; andClause = ` and ps.revision_desc like ?`}
        else if (e.startsWith('plan_type:')) { val = e.slice(10)+'%'; andClause = ` and ps.plan_type like ?`}
        else if (e.startsWith('pt:')) { val = e.slice(3)+'%'; andClause = ` and ps.plan_type like ?`}
        else if (e.startsWith('garage_type:')) { val = e.slice(12)+'%'; andClause = ` and ps.garage_type like ?`}
        else if (e.startsWith('gt:')) { val = e.slice(3)+'%'; andClause = ` and ps.garage_type like ?`}
        else if (e.startsWith('garage_swing:')) { val = e.slice(13)+'%'; andClause = ` and ps.garage_swing like ?`}
        else if (e.startsWith('gs:')) { val = e.slice(3)+'%'; andClause = ` and ps.garage_swing like ?`}
        else if (e.startsWith('foundation_type:')) { val = e.slice(16)+'%'; andClause = ` and ps.foundation_type like ?`}
        else if (e.startsWith('ft:')) { val = e.slice(3)+'%'; andClause = ` and ps.foundation_type like ?`}
        else if (e.startsWith('floor_type:')) { val = e.slice(11)+'%'; andClause = ` and ps.floor_type like ?`}
        else if (e.startsWith('flrt:')) { val = e.slice(4)+'%'; andClause = ` and ps.floor_type like ?`}
        else if (e.startsWith('roof_type:')) { val = e.slice(10)+'%'; andClause = ` and ps.roof_type like ?`}
        else if (e.startsWith('rt:')) { val = e.slice(3)+'%'; andClause = ` and ps.roof_type like ?`}
        else if (e.startsWith('limit:')) {
          let lim = e.slice(6);
          if (lim === 'no') {limitClause = ''}
          else if (isNaN(lim)) {limitClause = ' LIMIT 0, 200'}
          else {limitClause = `  LIMIT 0, ${lim}`}
        }

        else {
          // if (!isNaN(e)) { val = e; andClause = ` and p.last_updated_date >= NOW() - INTERVAL ? DAY`}
          // else {
            andClause = ` and CONCAT_WS( '~', p.job_number, p.address1, p.story, p.subdivision
            , p.city, cl.name, co.full_name, p.revision_desc
            , p.geo_lab, p.geo_report_num, p.geo_pi, p.soil_notes
            , p.additional_options, p.comments, p.status, co.full_name, co2.full_name
            , ps.scope, ps.revision_desc, ps.plan_type, ps.garage_type, ps.garage_swing
            , ps.foundation_type, ps.floor_type, ps.roof_type )
             like ?`;
            val = '%'+e+'%';
          // }

        }

        findClause = findClause + andClause;
        values.push(val);

      })

      orderBy = ' order by p.job_number';

    }

    let SQLstmt = SQL_PREQUERY
    + SQL_TABLES_SCOPE
    + enteredByClause  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
    + statusClause
    + dateRangeClause
    + findClause
    + orderBy
    + limitClause;

    // console.log('searchProjects', SQLstmt, values);
    if (callback) {
      // console.log('getProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getPendingProjects: function(userID, callback = null) {

    let SQLstmt = SQL_PROJECT_SELECT
    + SQL_TABLES
    + ' and p.user_id = ?'  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
    + ' and p.status = "PENDING"'
    + ' order by p.job_number';
    // console.log('ProjectModel: userID, SQL', userID, SQLstmt);

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, [userID], callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt, [userID]);
    }
    // return sql().query(SQLstmt, [userID], callback);
  },

  getScopeItems: function(projectID, callback = null) {
    let SQLstmt = `SELECT ps.*, ps.scope name, ps.id code, ps.id scope_id, ac.label`
      + ' FROM projects_scope ps'
      + ' INNER JOIN avff_controls ac on ps.scope = ac.name'
      + ' WHERE ac.entity_type = "ACTION"'
      + ' AND ps.project_id = ?'
      + ' ORDER BY ps.id';

    if (callback) {
      // console.log('getScopeItems: in the callback version');
      return sql().query(SQLstmt, [projectID], callback);
    } else {
      // console.log('getScopeItems: in the promise version');
      return sqlPromise(SQLstmt, [projectID]);
    }
    // return sql().query(SQLstmt, [userID], callback);
  },

  getDups: function(params, callback = null) {

    // Stripping the first character (:)
    Object.keys(params).forEach(key => params[key] = params[key].slice(0,5) === ':null'? '' : params[key].slice(1));

    // Pulling out the search parameters.  Initializing values array.
    const { test, address, subdivision, phase, section, block, lot } = params;
    let values = [];
    // console.log('ProjectModel params', test, address, subdivision, phase, section, block, lot);

    // Initiating the where clauses.  These will make it return 0
    let addressClause = '', lotClause = '';

    // Based on search parameter, set the where clauses.
    if (test === 'ADDRESS' && address) {
      addressClause = ' AND ( UPPER(p.address1) LIKE UPPER(?) )';
      values.push('%'+address+'%');
    } else

    if (test === 'LOT' && subdivision && block && lot) {
      lotClause = ' AND ( p.subdivision = ? and p.block = ? and p.lot = ? )';
      values.push(subdivision, block, lot);
    }

    let SQLstmt = SQL_PROJECT_SELECT
    + SQL_TABLES
    + addressClause  // make sure you have where after left joins.  Not doing so returns all rows (Cartesian join?)
    + lotClause
    + ' order by p.job_number';

    // console.log('ProjectModel: SQL', SQLstmt, values);

    if (callback) {
      // console.log('Model addProject: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Model getDups: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  getProjectByID: function(id, callback = null){

    let SQLstmt = SQL_PROJECT_SELECT
    + SQL_TABLES
    + ' and p.id = ?';

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
  addProject: function(project, callback = null){

  //inserting into mysql
  const {id, address_id, job_number, story, revision, revision_desc, client_id, client, user_id, contact_id, city, subdivision, address1, address2, phase, section, lot, block
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
    , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
    , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date
    , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status, scope, classification, onboard_date
    , start_date, due_date, final_due_date, transmittal_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
    , roof_type, num_stories, square_footage, pita_factor, dwelling_type, trello_list_id, trello_card_id, box_folder
    , created_by, last_updated_by }
    = project;

  // console.log("dwelling_type", dwelling_type);
  // console.log("job_number", job_number);
  // console.log("city", city);
  // console.log("addProject user_id", user_id);
  // console.log('addProject: Values', values)
  // console.log('addProject: Values', project, 'what is scope?', typeof scope);
  // Supports old v1 scope at project level just in case.  Sets variable to null if scope is the array.
  const project_scope = typeof scope === 'string'? scope:null;

  // const SQLstmt = "INSERT INTO projects (job_number, client_id, user_id, city, subdivision, address1, address2, phase, section"
  // + ", lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type"
  // + ", garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop"
  // + ", bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date"
  // + ", geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, created_by, last_updated_by)"
  // + " VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?)";

  // 11+10+7+6+11+8+6+2 fields
  const SQLstmt = `INSERT INTO projects (id, job_number, story, revision, revision_desc, client_id, user_id, contact_id, city, subdivision, address1, address2, phase, section
  , lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num,  geo_report_date
  , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status, classification, onboard_date
  , start_date, due_date, final_due_date, transmittal_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
  , roof_type, num_stories, square_footage, pita_factor, dwelling_type, trello_list_id, trello_card_id, box_folder
  , created_by, last_updated_by, scope)
   VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?)
   ON DUPLICATE KEY UPDATE job_number = ?, story = ?, revision = ?, revision_desc = ?, client_id = ?, user_id = ?, contact_id = ?, city = ?, subdivision = ?, address1 = ?, address2 = ?
  , phase = ?, section = ?, lot = ?, block = ?, fnd_height_fr = ?, fnd_height_fl = ?, fnd_height_rr = ?, fnd_height_rl = ?
  , plan_type = ?, elevation = ?, masonry = ?, garage_type = ?, garage_entry = ?, garage_swing = ?, garage_drop = ?, garage_extension = ?
  , covered_patio = ?, bay_window = ?, master_shower_drop = ?, bath1_shower_drop = ?, bath2_shower_drop = ?, bath3_shower_drop = ?
  , geo_lab = ?, geo_report_num = ?,  geo_report_date = ?, geo_pi = ?, em_center = ?, em_edge = ?, ym_center = ?, ym_edge = ?, soil_notes = ?
  , additional_options = ?, comments = ?, status = ?, project_status = ?, classification = ?, onboard_date = ?, start_date = ?
  , due_date = ?, final_due_date = ?, transmittal_date = ?, main_contact = ?, billing_contact = ?, builder_contact = ?, foundation_type = ?, floor_type = ?
  , roof_type = ?, num_stories = ?, square_footage = ?, pita_factor = ?, dwelling_type = ?, trello_list_id = ?, trello_card_id = ?, box_folder = ?
  , last_updated_by = ?, scope = ?`;

  const values = [id?id:address_id, job_number, story, revision, revision_desc, client_id, user_id, contact_id, city, subdivision, address1, address2 // 11
  , phase, section, lot, block, fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation // 10
  , masonry, garage_type, garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window // 8
  , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num  // 6
  , geo_report_date, geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status // 10
  , project_status, classification, onboard_date, start_date, due_date, final_due_date, transmittal_date, main_contact // 8
  , billing_contact, builder_contact, foundation_type, floor_type, roof_type, num_stories, square_footage // 7
  , pita_factor, dwelling_type, trello_list_id, trello_card_id, box_folder // 5
  , created_by, last_updated_by, project_scope // 3

  , job_number, story, revision, revision_desc, client_id, user_id, contact_id, city, subdivision, address1, address2, phase, section, lot, block // 14
  , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type // 8
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop // 7
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date // 6
  , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status // 10
  , classification, onboard_date, start_date, due_date, final_due_date, transmittal_date, main_contact, billing_contact, builder_contact // 9
  , foundation_type, floor_type, roof_type, num_stories, square_footage, pita_factor, dwelling_type, trello_list_id, trello_card_id  // 9
  , box_folder, last_updated_by, project_scope // 3
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
      // + ' set status = ?, trello_card_id = ?'
      + ' set trello_card_id = ?'
      + ' where id = ?';
    // const values = ['ACTIVE', cardID, ID];
    const values = [cardID, ID];

    return sqlPromise(SQLstmt, values);
  },

/**************************************************
************* Project Scope Queries ***************
**************************************************/

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addProjectScope: function(scope_item, callback = null) {
  //inserting into mysql
  const {id, scope_id, project_id, control_id, scope, name, job_number, description, revision, revision_desc, scope_status  // 10
    , onboard_date, start_date, due_date, final_due_date, transmittal_date  // 5
    , trello_list_id, trello_card_id, box_folder  // 3
    , plan_type, elevation, masonry, garage_type, garage_entry, garage_swing  // 6
    , garage_drop, garage_extension, covered_patio, bay_window // 4
    , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop  // 4
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl  // 4
    , foundation_type, floor_type, roof_type, num_stories, square_footage, dwelling_type // 6
    , additional_options, comments  // 2
    , status, created_by, last_updated_by } // 3  Total as of Dec 9, 2019 = 47
    = scope_item;

  // console.log("dwelling_type", dwelling_type);
  // console.log("job_number", job_number);
  // console.log("city", city);
  // console.log("user_id", user_id);
  // console.log('addProject: Values', values)

  const SQLstmt = `INSERT INTO projects_scope (id, project_id, scope, job_number, description, revision, revision_desc, scope_status
    , onboard_date, start_date, due_date, final_due_date, transmittal_date
    , trello_list_id, trello_card_id, box_folder
    , plan_type, elevation, masonry, garage_type, garage_entry, garage_swing
    , garage_drop, garage_extension, covered_patio, bay_window
    , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl
    , foundation_type, floor_type, roof_type, num_stories, square_footage, dwelling_type
    , additional_options, comments
    , status, created_by, last_updated_by)
   VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?)
   ON DUPLICATE KEY UPDATE project_id = ?, scope = ?, job_number = ?, description = ?, revision = ?, revision_desc = ?, scope_status = ?
     , onboard_date = ?, start_date = ?, due_date = ?, final_due_date = ?, transmittal_date = ?
     , trello_list_id = ?, trello_card_id = ?, box_folder = ?
     , plan_type = ?, elevation = ?, masonry = ?, garage_type = ?, garage_entry = ?, garage_swing = ?
     , garage_drop = ?, garage_extension = ?, covered_patio = ?, bay_window = ?
     , master_shower_drop = ?, bath1_shower_drop = ?, bath2_shower_drop = ?, bath3_shower_drop = ?
     , fnd_height_fr = ?, fnd_height_fl = ?, fnd_height_rr = ?, fnd_height_rl = ?
     , foundation_type = ?, floor_type = ?, roof_type = ?, num_stories = ?, square_footage = ?, dwelling_type = ?
     , additional_options = ?, comments = ?
     , status = ?, last_updated_by = ?`;

  const values = [id?id:scope_id, project_id, name, job_number, description, revision, revision_desc, scope_status  // 8
    , onboard_date, start_date, due_date, final_due_date, transmittal_date  // 5
    , trello_list_id, trello_card_id, box_folder  // 3
    , plan_type, elevation, masonry, garage_type, garage_entry, garage_swing  // 6
    , garage_drop, garage_extension, covered_patio, bay_window // 4
    , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop  // 4
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl  // 4
    , foundation_type, floor_type, roof_type, num_stories, square_footage, dwelling_type // 6
    , additional_options, comments  // 2
    , status, created_by, last_updated_by // 3

    , project_id, name, job_number, description, revision, revision_desc, scope_status  // 7
    , onboard_date, start_date, due_date, final_due_date, transmittal_date  // 5
    , trello_list_id, trello_card_id, box_folder  // 3
    , plan_type, elevation, masonry, garage_type, garage_entry, garage_swing  // 6
    , garage_drop, garage_extension, covered_patio, bay_window // 4
    , master_shower_drop, bath1_shower_drop, bath2_shower_drop, bath3_shower_drop  // 4
    , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl  // 4
    , foundation_type, floor_type, roof_type, num_stories, square_footage, dwelling_type // 6
    , additional_options, comments  // 2
    , status, last_updated_by // 2
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

  deleteProjectScope: (id) => {
    const SQLstmt = "DELETE from projects_scope where id = ?";
    const values = [id];
    return sqlPromise(SQLstmt, values);
  },

  // right now only used when deleting the project.
  deleteProjectScopeAll: (id) => {
    const SQLstmt = "DELETE from projects_scope where project_id = ?";
    const values = [id];
    return sqlPromise(SQLstmt, values);
  },

  getRevScopeItems: function(rev, callback = null) {

    let SQLstmt = `select ph1.record_revision, ph1.parent_revision
      , ph1.dt_datetime, ph1.id, ph1.project_id, ph1.scope, ifnull(ph1.revision,'ORIG') revision
      , ph1.revision_desc
      from (
        select id, revision, max(record_revision) maxrev
        from projects_scope_history ph2
        where ph2.project_id = ?
        group by ph2.id, ph2.revision
      ) maxrevs,
      projects_scope_history ph1
      where ph1.project_id = ?
      and maxrevs.id = ph1.id
      and maxrevs.maxrev = ph1.record_revision
      and ifnull(ph1.revision, 'ORIG') = ifnull(?, 'ORIG')
      order by ph1.id`;

    const values = [rev.id, rev.id, rev.revision];

    if (callback) {
      // console.log('getScopeItems: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getScopeItems: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
    // return sql().query(SQLstmt, [userID], callback);
  },

  getRevisions: function(projectID, callback = null) {

    // let SQLstmt = `select ph1.record_revision, date_format(ph1.dt_datetime, '%Y-%m-%d') rev_date
    // , ph1.id, ph1.job_number, ifnull(ph1.revision,'ORIG') revision, ph1.revision_desc
    //   from (
    //     select revision, max(record_revision) maxrev
    //     from projects_history ph2
    //     where ph2.id = ?
    //     group by ph2.revision
    //   ) maxrevs,
    //   projects_history ph1
    //   where ph1.id = ?
    //   and maxrevs.maxrev = ph1.record_revision
    //   order by record_revision desc`;

    // let SQLstmt = `select revision, min(rev_date) rev_date
    //   from projects_revisions
    //   where project_id = ?
    //   group by revision desc`;

    let SQLstmt = `select pr.id, pr.project_id, ifnull(pr.scope_id, -1) scope_id, pr.revision
      , pr.reason revision_reason_code, pr.responsibility revision_resp_code
      , pr.description revision_desc, pr.price revision_price, pr.designer_id
      , date_format(pr.rev_date, '%Y-%m-%dT%T') rev_date
      , IFNULL(ps.scope, 'Project') scope, l1.name revision_reason, l2.name revision_resp, c.full_name designer
      FROM projects_revisions pr
      left join projects_scope ps on pr.scope_id = ps.id
      left join lookups l1 on pr.reason = l1.code
      left join lookups l2 on pr.responsibility = l2.code
      left join contacts c on pr.designer_id = c.id
      where pr.project_id = ?
      order by pr.revision desc, pr.rev_date desc, pr.id desc`;

    if (callback) {
      // console.log('getScopeItems: in the callback version');
      // return sql().query(SQLstmt, [projectID, projectID], callback);
      return sql().query(SQLstmt, [projectID], callback);
    } else {
      // console.log('getScopeItems: in the promise version');
      // return sqlPromise(SQLstmt, [projectID, projectID]);
      return sqlPromise(SQLstmt, [projectID]);
    }
    // return sql().query(SQLstmt, [userID], callback);
  },

  addRevisions: function(rev, callback = null) {

    //inserting into mysql
    const {id, project_id, scope_id, revision, revision_reason_code
      , revision_resp_code, revision_desc, revision_price, designer_id, rev_date
      , created_by, last_updated_by
    } = rev;

    // const updDate = rev_date.replace('T', ' ');
    const updDate = rev_date;
    console.log("rev date", updDate);

    const SQLstmt = `INSERT INTO projects_revisions (id, project_id, scope_id
      , revision, reason, responsibility, description, price, designer_id, rev_date
      , created_by, last_updated_by)
      VALUES(?,?,?,?,?,?,?,?,?,? ,?,?)
      ON DUPLICATE KEY UPDATE project_id = ?, scope_id = ?, revision = ?
      , reason = ?, responsibility = ?, description = ?, price = ?, designer_id = ?
      , rev_date = ?, created_by = ?, last_updated_by = ?`;

    const values = [id, project_id, scope_id===-1?null:scope_id, revision, revision_reason_code
      , revision_resp_code, revision_desc, revision_price, designer_id, updDate
      , created_by, last_updated_by

      , project_id, scope_id===-1?null:scope_id, revision, revision_reason_code
      , revision_resp_code, revision_desc, revision_price, designer_id, updDate
      , created_by, last_updated_by
    ];

    if (callback) {
      // console.log('getScopeItems: in the callback version');
      // return sql().query(SQLstmt, [projectID, projectID], callback);
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getScopeItems: in the promise version');
      // return sqlPromise(SQLstmt, [projectID, projectID]);
      return sqlPromise(SQLstmt, values);
    }
    // return sql().query(SQLstmt, [userID], callback);
  },

  deleteRevision: (id) => {
    const SQLstmt = "DELETE from projects_revisions where id = ?";
    const values = [id];
    return sqlPromise(SQLstmt, values);
  },

};

export default ProjectModel;
