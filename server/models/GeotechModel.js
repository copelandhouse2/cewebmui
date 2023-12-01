import { sql } from '../mysqldb';

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const SQL_GEO_SELECT = `SELECT id, code, code geo_code, name, name geotech
, address address1, city, state state_prov, zipcode, firm_num, main_contact
, main_contact_phone, main_contact_email, secondary_contact
, secondary_contact_phone, secondary_contact_email, created_by, last_updated_by
FROM geotechs
WHERE 1=1`;

const GeotechModel = {
  getGeos: () => {
    const SQLstmt = SQL_GEO_SELECT + ' order by name';
    const values = [];
    return sqlPromise(SQLstmt, values);
  },

  findGeos: (params) => {
    const { findString } = params;
    let values = [];
    let findClause = '';

    // console.log('findGeos', findString);
    if (findString) {
      // console.log('findGeos inside if', findString);
      findClause = ` and CONCAT_WS( '~', code, name, firm_num
      , main_contact, main_contact_phone, main_contact_email)
       like ?`;
      values.push('%' + findString + '%');
    }

    let SQLstmt = SQL_GEO_SELECT + findClause + ' order by name';

    return sqlPromise(SQLstmt, values);
  },

  saveGeo: (geo) => {
    // console.log('save geotech', geo);

    const {
      id,
      geo_code,
      geotech,
      address1,
      city,
      state_prov,
      zipcode,
      firm_num,
      main_contact,
      main_contact_phone,
      main_contact_email,
      secondary_contact,
      secondary_contact_phone,
      secondary_contact_email,
      created_by,
      last_updated_by,
    } = geo;

    const SQLstmt = `INSERT INTO geotechs (id, code, name, address, city, state, zipcode, firm_num
    , main_contact, main_contact_phone, main_contact_email, secondary_contact
    , secondary_contact_phone, secondary_contact_email, created_by, last_updated_by)
    VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?)
    ON DUPLICATE KEY UPDATE code = ?, name = ?, address = ?, city = ?, state = ?
    , zipcode = ?, firm_num = ?, main_contact = ?, main_contact_phone = ?
    , main_contact_email = ?, secondary_contact = ?, secondary_contact_phone = ?
    , secondary_contact_email = ?, last_updated_by = ?`;

    const values = [
      id,
      geo_code,
      geotech,
      address1,
      city,
      state_prov,
      zipcode,
      firm_num,
      main_contact,
      main_contact_phone,
      main_contact_email,
      secondary_contact,
      secondary_contact_phone,
      secondary_contact_email,
      created_by,
      last_updated_by,

      geo_code,
      geotech,
      address1,
      city,
      state_prov,
      zipcode,
      firm_num,
      main_contact,
      main_contact_phone,
      main_contact_email,
      secondary_contact,
      secondary_contact_phone,
      secondary_contact_email,
      last_updated_by,
    ];

    // console.log('Model addGeos: SQL', SQLstmt);
    // console.log('Model addGeos: Values', values);

    return sqlPromise(SQLstmt, values);
  },

  deleteGeo: (id) => {
    const SQLstmt = 'DELETE from geotechs where id = ?';
    const values = [id];
    return sqlPromise(SQLstmt, values);
  },

  getMasterData: (ID) => {
    let geoClause = '';
    let values = [];
    if (ID) {
      geoClause = ' and geotech_id = ?';
      values.push(ID);
    }

    const SQLstmt =
      `SELECT id, geotech_id, pi, fill, emc, eme, ymc, yme, notes, beam_depth
      , beam_width, beam_spacing, ext_beam_cables, int_beam_cables, bearing_capacity
      , penetration
      from geotech_data
      where report_id IS NULL` + geoClause;

    return sqlPromise(SQLstmt, values);
  },

  getReportData: (ID) => {
    const SQLstmt = `SELECT id, geotech_id, pi, fill, emc, eme, ymc, yme, notes, beam_depth
      , beam_width, beam_spacing, ext_beam_cables, int_beam_cables, bearing_capacity
      , penetration
      from geotech_data
      where report_id = ?`;
    const values = [ID];
    return sqlPromise(SQLstmt, values);
  },
};

export default GeotechModel;
