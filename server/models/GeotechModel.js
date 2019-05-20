import { sql } from "../mysqldb";

const sqlPromise = (SQLstmt, values) => {
  return new Promise((resolve, reject) => {
    sql().query(SQLstmt, values, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

const GeotechModel = {

  getGeos: () => {
    const SQLstmt = 'SELECT id, code, name from geotechs';
    const values = [];
    return sqlPromise(SQLstmt, values);
  },

  addGeo: (geo) => {
    const { geo_id, code, name, address, city, state, zipcode, firm_num
    , main_contact, main_contact_phone, main_contact_email, secondary_contact
    , secondary_contact_phone, secondary_contact_email }
    = geo;

    const SQLstmt = `INSERT INTO geotechs (id, code, name, address, city, state, zipcode, firm_num
    , main_contact, main_contact_phone, main_contact_email, secondary_contact
    , secondary_contact_phone, secondary_contact_email, created_by, last_updated_by)
    VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?)
    ON DUPLICATE KEY UPDATE code = ?, name = ?, address = ?, city = ?, state = ?
    , zipcode = ?, firm_num = ?, main_contact = ?, main_contact_phone = ?
    , main_contact_email = ?, secondary_contact = ?, secondary_contact_phone = ?
    , secondary_contact_email = ?, created_by = ?, last_updated_by = ?`;

    const values = [geo_id, code, name, address, city, state, zipcode, firm_num
    , main_contact, main_contact_phone, main_contact_email, secondary_contact
    , secondary_contact_phone, secondary_contact_email, created_by
    , last_updated_by

    , code, name, address, city, state, zipcode, firm_num
    , main_contact, main_contact_phone, main_contact_email, secondary_contact
    , secondary_contact_phone, secondary_contact_email, created_by
    , last_updated_by
    ];

    // console.log('Model addGeos: SQL', SQLstmt);
    // console.log('Model addGeos: Values', values);

    return sqlPromise(SQLstmt, values);
  },

  getMasterData: (ID) => {
    let geoClause = ''
    let values = [];
    if (ID) {
      geoClause = ' and geotech_id = ?';
      values.push(ID);
    };

    const SQLstmt = `SELECT id, geotech_id, pi, fill, emc, eme, ymc, yme, notes, beam_depth
      , beam_width, beam_spacing, ext_beam_cables, int_beam_cables, bearing_capacity
      , penetration
      from geotech_data
      where report_id IS NULL`
      + geoClause;

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
