import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

// WHERE role = 'INSPECTOR'
const SQL_FILTER_SELECT = `(SELECT id code, full_name name, 'INSPECTOR' entity
  FROM contacts
  WHERE 1=1
  AND full_name like ?
  )
  UNION
  (SELECT id code, concat(address1,' (',job_number,IFNULL(revision,''),')') name, 'ADDRESS' entity
  FROM projects p
  WHERE 1=1
  AND CONCAT_WS('~',address1,job_number) like ?
  )
  UNION
  (SELECT id code, name, 'CLIENT' entity
  FROM clients
  WHERE 1=1
  AND name like ?
  )
  UNION
  (SELECT code, name, 'STATUS' entity
  FROM lookups
  WHERE 1=1
  AND type = 'INSP_STATUS'
  AND name like ?
  )
  UNION
  (SELECT id code, name, 'CABLE' entity
  FROM organizations
  WHERE 1=1
  AND name like ?
  )`;

// const SQL_FILTER_SELECT = `(SELECT id code, full_name name, 'INSPECTOR' entity
//   FROM contacts
//   WHERE 1=1
//   AND full_name like ?
//   )
//   UNION
//   (SELECT id code, concat(address1,' (',job_number,IFNULL(revision,''),')') name, 'ADDRESS' entity
//   FROM projects p
//   WHERE 1=1
//   AND CONCAT_WS('~',address1,job_number) like ?
//   UNION
//   (SELECT id code, name, 'CLIENT' entity
//   FROM clients
//   WHERE 1=1
//   AND name like ?
// UNION
// (SELECT distinct insp_contact code, insp_contact name, 'INSP_CONTACT' entity
// FROM inspections
// WHERE 1=1
// AND insp_contact like ?
// UNION
// (SELECT code, name, 'STATUS' entity
// FROM lookups
// WHERE 1=1
// AND type = 'INSP_STATUS'
// AND name like ?
// )`;

// const SQL_FILTER_SELECT = `(SELECT id code, full_name name, 'INSPECTOR' entity
//   FROM contacts
//   WHERE 1=1
//   AND full_name like ?
//   )
//   UNION
//   (SELECT id code, concat(address1,' (',job_number,IFNULL(revision,''),')') name, 'ADDRESS' entity
//
//   FROM projects
//   WHERE 1=1
//   AND address1 like ?
//   )`;

const SQL_FILTER_PROJECT_SELECT = `(
  SELECT id, id code, id project_id, concat(address1,' (',job_number,IFNULL(revision,''),')') name, 'ADDRESS' entity
  FROM projects
  WHERE 1=1
  AND job_number like ?
  )
  UNION
  (SELECT id, id code, id project_id, concat(address1,' (',job_number,IFNULL(revision,''),')') name, 'ADDRESS' entity
  FROM projects
  WHERE 1=1
  AND address1 like ?
  )`;

const SQL_PROJECT_SELECT = `SELECT id, id code, id project_id, job_number, concat(address1,' (',job_number,IFNULL(revision,''),')') name, 'ADDRESS' entity
  FROM projects
  WHERE 1=1
  AND id = ?`;

const SQL_INSPECTION_SELECT = `SELECT pi.id, pi.project_id, pi.project_id code
  , concat(p.address1,' (',p.job_number,IFNULL(p.revision,''),')') name, pi.project_revision
  , pi.scope_id, pi.contact_id, insp_date, date_format(pi.insp_date, '%Y-%m-%d') inspection_date
  , pi.type, pi.type inspection_type
  , pi.status, pi.status inspection_status
  , pi.billable, pi.billable inspection_billable, pi.vpo
  , pi.vpo inspection_vpo, pi.deep_beam, pi.barrier_beam, pi.reinspection, pi.rain_reinspection
  , pi.upper_slab, pi.lower_slab, pi.ret_wall_on_slab, pi.insp_contact inspection_contact
  , pi.cable_company_id, date_format(pi.target_stress_date, '%Y-%m-%d') target_stress_date
  , pi.created_by, pi.last_updated_by, pi.creation_date, pi.last_updated_date
  , p.job_number, concat(p.job_number,IFNULL(p.revision,'')) job_rev, p.address1, c.full_name inspector, ps.scope scope_name, ac.label scope
  , p.client_id, cl.name client, p.subdivision, p.city, p.lot, p.block
  FROM inspections pi
  JOIN contacts c on pi.contact_id = c.id
  JOIN projects p on pi.project_id = p.id
  JOIN clients cl on p.client_id = cl.id
  JOIN projects_scope ps on pi.scope_id = ps.id
  JOIN avff_controls ac on ps.scope = ac.name
  WHERE 1=1
  AND ac.entity_type = 'ACTION'`;

const InspectionModel = {
  getInspections: (params) => {
    const { choiceType, choice, dateRange } = params;
    console.log('in get inspections', params);

    let values = [];
    let findClause = ` and pi.id = -1`  // don't return anything
    let dateRangeClause = '';
    // the default limit clause
    let limitClause = ' LIMIT 0, 200';

    if (choice) {
      switch (choiceType) {
        case 'INSPECTOR':
          findClause = ` and c.id = ?`;
          values.push(Number(choice));
          break;
        case 'ADDRESS':
          findClause = ` and p.id = ?`;
          values.push(Number(choice));
          break;
        case 'CLIENT':
          findClause = ` and cl.id = ?`;
          values.push(Number(choice));
          break;
        case 'INSP_CONTACT':
          findClause = ` and pi.insp_contact like ?`;
          values.push('%'+choice+'%');
          break;
        case 'STATUS':
          if (choice === 'PEND') {
            findClause = ` and isnull(pi.status)`;
          } else {
            findClause = ` and pi.status = ?`;
            values.push(choice);
          }
          break;
        case 'CABLE':
          findClause = ` and pi.cable_company_id = ?`;
          values.push(Number(choice));
          break;
        default:
          findClause = ` and pi.project_id = ?`;
          values.push(Number(choice));
        break;
      };
    }

    if (dateRange !== '' && dateRange !== null) {
      const year = new Date().getFullYear();
      switch (dateRange) {
        case 'CURYEAR':
          dateRangeClause = ' and pi.insp_date BETWEEN "?-01-01" AND "?-12-31"';
          values.push(Number(year));
          values.push(Number(year));
          break;
        case 'LASTYEAR':
          dateRangeClause = ' and pi.insp_date BETWEEN "?-01-01" AND "?-12-31"';
          values.push(Number(year)-1);
          values.push(Number(year)-1);
          break;
        case 'ALLTIME':
          break;
        default:
          dateRangeClause = ' and pi.insp_date >= CURRENT_DATE() - INTERVAL ? DAY';
          values.push(Number(dateRange));
        break;
      };
      // remove limit clause when date range provided.
      limitClause = '';
    };
    // if (choice_id && choice_type === 'INSPECTOR') {
    //   // console.log('findCities inside if', findString);
    //   findClause = ` and pi.contact_id = ?`;
    //   values.push(Number(choice_id));
    // } else if (choice_id && choice_type === 'ADDRESS') {
    //   findClause = ` and pi.project_id = ?`;
    //   values.push(Number(choice_id));
    // }

    let SQLstmt = SQL_INSPECTION_SELECT
    + findClause
    + dateRangeClause
    + limitClause
    + ' ORDER BY pi.insp_date desc';

    return sqlPromise(SQLstmt, values);
  },

  getPrevProjectInspections: (params) => {
    const { proj_id, cur_insp_id } = params;
    console.log('in get inspections', params);

    let findClause = ` and pi.project_id = ? AND pi.id != ?`  // don't return anything

    const values = [Number(proj_id), Number(cur_insp_id)];

    let SQLstmt = SQL_INSPECTION_SELECT
    + findClause
    + ' ORDER BY pi.insp_date desc';

    return sqlPromise(SQLstmt, values);
  },

  getInspectionyByID: function(id, callback = null){
    let SQLstmt = SQL_INSPECTION_SELECT
    + ' and pi.id = ?'
    + ' ORDER BY pi.id';

    let values = [];
    values.push(id);

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getProjectyByID: function(id, callback = null){

    let SQLstmt = SQL_PROJECT_SELECT;

    let values = [];
    values.push(id);

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getReasons: (insp_id) => {
    // console.log('in get reasons', insp_id);

    const SQLstmt = `SELECT i.*, @count:=@count+1 "order"
      FROM inspection_reasons i
      CROSS JOIN (select @count:=0) counter
      WHERE i.inspection_id = ?
      ORDER BY i.id`;

      let values = [];
      values.push(insp_id);

    return sqlPromise(SQLstmt, values);
  },

  filterContactsProjects: (params) => {
    const { findString } = params;
    let values = [];

    let SQLstmt = SQL_FILTER_SELECT;
    values.push('%'+findString+'%'); // first part of union
    values.push('%'+findString+'%'); // second part of union
    values.push('%'+findString+'%'); // third part of union
    values.push('%'+findString+'%'); // fourth part of union
    values.push('%'+findString+'%'); // fifth part of union
    return sqlPromise(SQLstmt, values);
  },

  filterProjects: (params) => {
    const { findString } = params;
    let values = [];

    let SQLstmt = SQL_FILTER_PROJECT_SELECT;
    values.push('%'+findString+'%'); // first part of union
    values.push('%'+findString+'%'); // second part of union
    return sqlPromise(SQLstmt, values);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  save: function(inspection, callback = null){
    console.log('save inspection function', inspection);

    const { id, project_id, revision, scope_id, contact_id, inspection_date
    , inspection_type, inspection_status, inspection_billable
    , inspection_vpo, deep_beam, barrier_beam, reinspection, rain_reinspection
    , upper_slab, lower_slab, ret_wall_on_slab, inspection_contact, cable_company_id
    , target_stress_date
    , created_by, last_updated_by } = inspection;

    // console.log('save city id', id);

    const SQLstmt = `INSERT into inspections
      (id, project_id, project_revision, scope_id, contact_id, insp_date
      , type, status, billable, vpo, deep_beam, barrier_beam, reinspection
      , rain_reinspection, upper_slab, lower_slab, ret_wall_on_slab
      , insp_contact, cable_company_id, target_stress_date
      , created_by, last_updated_by)
      values(?,?,?,?,?,?,?,?,?,?  ,?,?,?,?,?,?,?,?,?,?  ,?,?)
      on duplicate key update project_id = ?, project_revision = ?, scope_id = ?
      , contact_id = ?, insp_date = ?, type = ?, status = ?
      , billable = ?, vpo = ?, deep_beam = ?, barrier_beam = ?, reinspection = ?
      , rain_reinspection = ?, upper_slab = ?, lower_slab = ?, ret_wall_on_slab = ?
      , insp_contact = ?, cable_company_id = ?, target_stress_date = ?
      , last_updated_by = ?`;

    const values = [id, project_id, revision, scope_id, contact_id, inspection_date
    , inspection_type, inspection_status, inspection_billable, inspection_vpo
    , deep_beam, barrier_beam, reinspection, rain_reinspection, upper_slab, lower_slab
    , ret_wall_on_slab, inspection_contact, cable_company_id, target_stress_date
    , created_by, last_updated_by, project_id, revision
    , scope_id, contact_id, inspection_date, inspection_type, inspection_status
    , inspection_billable, inspection_vpo, deep_beam, barrier_beam
    , reinspection, rain_reinspection, upper_slab, lower_slab, ret_wall_on_slab
    , inspection_contact, cable_company_id, target_stress_date, last_updated_by];

    // return sql().query(SQLstmt, values, callback);
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  delete: function(id, callback = null){

    const SQLstmt = 'DELETE from inspections where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('delete Sub promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }

  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  saveReason: function(aReason, callback = null){
    console.log('save reason function', aReason);

    const { id, inspection_id, reason, comments, created_by, last_updated_by } = aReason;

    const SQLstmt = `INSERT into inspection_reasons
      (id, inspection_id, reason, comments, created_by, last_updated_by)
      values(?,?,?,?,?,?)
      on duplicate key update inspection_id = ?, reason = ?, comments = ?
      , last_updated_by = ?`;

    const values = [id, inspection_id, reason, comments, created_by, last_updated_by
    , inspection_id, reason, comments, last_updated_by];

    // return sql().query(SQLstmt, values, callback);
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  deleteReason: function(id, callback = null){

    const SQLstmt = 'DELETE from inspection_reasons where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('delete Sub promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },

  deleteAllReasons: function(insp_id, callback = null){

    const SQLstmt = 'DELETE from inspection_reasons where inspection_id = ?';
    const values = [insp_id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('delete Sub promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },

};

export default InspectionModel;
