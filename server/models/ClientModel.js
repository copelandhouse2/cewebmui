import { sql } from '../mysqldb';

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_CLIENT_SELECT = `SELECT cl.id, cl.id code, cl.name, cl.name client, cl.name client_name
, cl.full_name, cl.full_name client_full_name, cl.billing_address1, cl.billing_address2
, cl.billing_city, cl.billing_state_prov, cl.billing_zipcode, cl.billing_country
, cl.compliance_dl, cl.active
, main_contact, main_contact_email, main_contact_phone
, billing_contact, billing_contact_email, billing_contact_phone
, cl.logo
, cl.notes, c.id city_id
FROM clients cl
left join cities c on cl.billing_city = c.city
WHERE 1=1`;

// const SQL_TABLES = ' from projects p'
// + ' left join clients cl on p.client_id = cl.id'  // allowing client_id to be null
// + ' left join contacts co on p.contact_id = co.id'  // allowing contact_id to be null
// + ' left join contacts co2 on p.user_id = co2.user_id'  // user id should NEVER be null
// + ' left join contacts co3 on p.last_updated_by = co3.user_id'  // user id should NEVER be null
// + ' left join cities c on p.city = c.city'  // allowing city_id to be null
// + ' left join subdivisions su on p.subdivision = su.subdivision'  // allowing subdivision to be null
// + ' left join lookups l on IFNULL(p.trello_list_id, \'\') = l.code'
// + ' where l.type = "TRELLO_LIST"';

const ClientModel = {
  getClients: function (callback = null) {
    // const SQLstmt = 'select id, id code, name, name client, full_name, compliance_dl, active, notes from clients';
    const SQLstmt = SQL_CLIENT_SELECT;
    const values = [];
    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  getClientByID: function (id, callback = null) {
    const whereClause = ' AND cl.id=?';
    const values = [id];

    // const SQLstmt = 'select id, id code, name, name client, full_name, compliance_dl, active, notes from clients where id=?';
    const SQLstmt = SQL_CLIENT_SELECT + whereClause;

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getClients: in the promise version');
      return sqlPromise(SQLstmt, values);
    }
  },

  findClients: (params) => {
    const { findString } = params;
    let values = [];
    let findClause = '';

    // console.log('findClients', findString);
    if (findString) {
      // console.log('findClients inside if', findString);
      findClause = ` and CONCAT_WS( '~', cl.id, cl.name, cl.full_name
      , cl.billing_address1, cl.billing_city, cl.billing_state_prov, cl.billing_zipcode)
       like ?`;
      values.push('%' + findString + '%');
    }

    let SQLstmt = SQL_CLIENT_SELECT + findClause + ' order by cl.id';

    return sqlPromise(SQLstmt, values);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addClient: function (client, callback) {
    const SQLstmt =
      'insert into clients' +
      ' (id, name, full_name, compliance_dl, active, notes, created_by, last_updated_by)' +
      ' values (?, ?, ?, ?, ?, ?, ?, ?)' +
      ' on duplicate key update name = ?, full_name = ?, compliance_dl = ?, active = ?, notes = ?, last_updated_by = ?';

    const values = [
      client.id,
      client.name,
      client.full_name,
      client.compliance_dl,
      client.active,
      client.notes,
      client.created_by,
      client.last_updated_by,
      client.name,
      client.full_name,
      client.compliance_dl,
      client.active,
      client.notes,
      client.last_updated_by,
    ];
    return sql().query(SQLstmt, values, callback);
  },

  save: function (client, callback = null) {
    const {
      id,
      name,
      client_name,
      full_name,
      client_full_name,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state_prov,
      billing_zipcode,
      billing_country,
      compliance_dl,
      main_contact,
      main_contact_email,
      main_contact_phone,
      billing_contact,
      billing_contact_email,
      billing_contact_phone,
      active,
      notes,
      created_by,
      last_updated_by,
    } = client;

    const SQLstmt = `INSERT into clients
      (id, name, full_name, billing_address1, billing_address2, billing_city
      , billing_state_prov, billing_zipcode, billing_country
      , compliance_dl
      , main_contact, main_contact_email, main_contact_phone
      , billing_contact, billing_contact_email, billing_contact_phone
      , active, notes, created_by, last_updated_by)
      VALUES (?,?,?,?,?,?,?,?,?,?,   ?,?,?,?,?,?,?,?,?,?)
      ON DUPLICATE KEY UPDATE name = ?, full_name = ?, billing_address1 = ?
      , billing_address2 = ?, billing_city = ?, billing_state_prov = ?
      , billing_zipcode = ?, billing_country = ?, compliance_dl = ?
      , main_contact = ?, main_contact_email = ?, main_contact_phone = ?
      , billing_contact = ?, billing_contact_email = ?, billing_contact_phone = ?
      , active = ?, notes = ?, last_updated_by = ?`;

    const values = [
      id,
      client_name ? client_name : name,
      client_full_name ? client_full_name : full_name,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state_prov,
      billing_zipcode,
      billing_country,
      compliance_dl,
      main_contact,
      main_contact_email,
      main_contact_phone,
      billing_contact,
      billing_contact_email,
      billing_contact_phone,
      active,
      notes,
      created_by,
      last_updated_by,
      client_name ? client_name : name,
      client_full_name ? client_full_name : full_name,
      billing_address1,
      billing_address2,
      billing_city,
      billing_state_prov,
      billing_zipcode,
      billing_country,
      compliance_dl,
      main_contact,
      main_contact_email,
      main_contact_phone,
      billing_contact,
      billing_contact_email,
      billing_contact_phone,
      active,
      notes,
      last_updated_by,
    ];

    // return sql().query(SQLstmt, values, callback);
    return sqlPromise(SQLstmt, values);
  },

  delete: function (id, callback = null) {
    const SQLstmt = 'DELETE from clients where id = ?';
    const values = [id];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('delete Client promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }

    // return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  // updateClient: function (client, callback) {
  //   const SQLstmt = 'update clients set name = ?, full_name = ?, compliance_dl = ?, active = ?, notes = ?, last_updated_by = ? where id = ?';
  //   const values = [client.name, client.full_name, client.compliance_dl, client.active, client.notes, client.last_updated_by, client.id];
  //   return sql().query(SQLstmt, values, callback);
  // },

  getReportScope: (client_id, callback = null) => {
    const SQLstmt = `
    SELECT DATE_FORMAT(p.creation_date,'%Y') year, ac.label, count(ps.scope) count
    FROM projects_scope ps
    INNER JOIN projects p on ps.project_id = p.id
    INNER JOIN avff_controls ac on ps.scope = ac.name
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    and ac.entity_type = 'ACTION'
    GROUP BY year, ac.label
    ORDER BY year, count
    `;
    const values = [parseInt(client_id, 10)];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Report data promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },
  getReportSlabs: (client_id, callback = null) => {
    const SQLstmt = `
    SELECT DATE_FORMAT(p.creation_date,'%Y') year, month(p.creation_date) month, count(ps.scope) count
    FROM projects_scope ps
    INNER JOIN projects p on ps.project_id = p.id
    INNER JOIN avff_controls ac on ps.scope = ac.name
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    AND ac.entity_type = 'ACTION'
    AND ps.scope in ('volfoundation','cusfoundation')
    GROUP BY year, month
    ORDER BY year, month
    `;
    const values = [parseInt(client_id, 10)];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Report data promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },
  getReportProjects: (client_id, callback = null) => {
    const SQLstmt = `
    SELECT year(p.creation_date) year, count(p.id) count
    FROM projects p
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY year
    UNION
    select 'TOTAL' year, count(p.id) count
    from projects p
    where 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY year
    ORDER BY year
    `;
    const values = [parseInt(client_id, 10), parseInt(client_id, 10)];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Report data promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },
  getReportRevs: (client_id, callback = null) => {
    const SQLstmt = `
    SELECT 1 \`order\`, year(p.creation_date) year, pr.revision revision, count(distinct year(p.creation_date), pr.project_id, pr.revision) count
    FROM projects_revisions pr
    INNER JOIN projects p on pr.project_id = p.id
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY \`order\`, year, revision
    UNION
    SELECT 2 \`order\`, year(p.creation_date) year, 'TOTAL' revision, count(distinct year(p.creation_date), pr.project_id, pr.revision) count
    FROM projects_revisions pr
    INNER JOIN projects p on pr.project_id = p.id
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY \`order\`, year, revision
    UNION
    SELECT 3 \`order\`, 'TOTAL' year, pr.revision revision, count(distinct year(p.creation_date), pr.project_id, pr.revision) count
    FROM projects_revisions pr
    INNER JOIN projects p on pr.project_id = p.id
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY \`order\`, year, revision
    UNION
    SELECT 4 \`order\`, 'TOTAL' year, 'TOTAL' revision, count(distinct year(p.creation_date), pr.project_id, pr.revision) count
    FROM projects_revisions pr
    INNER JOIN projects p on pr.project_id = p.id
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY \`order\`, year, revision
    ORDER BY \`order\`, year, revision
    `;
    const values = [parseInt(client_id, 10), parseInt(client_id, 10), parseInt(client_id, 10), parseInt(client_id, 10)];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Report data promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },
  getReportReasons: (client_id, callback = null) => {
    const SQLstmt = `
    SELECT year(p.creation_date) year, ifnull(l.name,'BLANK') reasons, count(distinct year(p.creation_date), pr.project_id, pr.revision, ifnull(pr.reason,1)) count
    FROM projects_revisions pr
    INNER join projects p on pr.project_id = p.id
    LEFT join lookups l on pr.reason = l.code
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY year, reasons
    UNION
    select 'TOTAL' year, ifnull(l.name,'BLANK') reasons, count(distinct year(p.creation_date), pr.project_id, pr.revision, ifnull(pr.reason,1)) count
    FROM projects_revisions pr
    INNER join projects p on pr.project_id = p.id
    LEFT join lookups l on pr.reason = l.code
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY year, reasons
    ORDER BY year, reasons
    `;
    const values = [parseInt(client_id, 10), parseInt(client_id, 10)];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Report data promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },
  getReportResps: (client_id, callback = null) => {
    const SQLstmt = `
    SELECT year(p.creation_date) year, ifnull(l.name,'BLANK') resps, count(distinct year(p.creation_date), pr.project_id, pr.revision, ifnull(pr.responsibility,1)) count
    FROM projects_revisions pr
    INNER join projects p on pr.project_id = p.id
    LEFT join lookups l on pr.responsibility = l.code
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY year, resps
    UNION
    select 'TOTAL' year, ifnull(l.name,'BLANK') resps, count(distinct year(p.creation_date), pr.project_id, pr.revision, ifnull(pr.responsibility,1)) count
    FROM projects_revisions pr
    INNER join projects p on pr.project_id = p.id
    LEFT join lookups l on pr.responsibility = l.code
    WHERE 1=1
    AND p.client_id = ?
    AND p.status != 'CANCELED'
    GROUP BY year, resps
    ORDER BY year, resps
    `;
    const values = [parseInt(client_id, 10), parseInt(client_id, 10)];

    if (callback) {
      // console.log('getClients: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('Report data promise', SQLstmt, values);
      return sqlPromise(SQLstmt, values);
    }
  },
};

export default ClientModel;

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
