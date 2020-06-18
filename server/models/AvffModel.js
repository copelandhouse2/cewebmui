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

// AVFF stands for Actions, Views, Frames, Fields
// Action => View => Frame => Field
// These are the building blocks of the application
// Our software has some action to perform.
// An Action will call a view (or a couple of them).  Single Entry, Tabular, Guided
// The View may have one or more frames on it.  A frame is a group of fields
//   with a similar function or category
// In the frames are the fields, or columns if tabular.

// In the DB, there are 2 tables... avff_controls, avff_relationships
// avff_controls stores the definitions of each Object
// avff_relationships stores the parent child relationship of the objects
//   to each other.

const AvffModel = {
  getAllControls: function(callback = null) {

    // , CONVERT(ac.image USING utf8mb4) image

    const SQLstmt = `select ac.id, ac.name, ac.label, ac.entity_type, ac.scope_section
      , CONVERT(ac.image USING utf8mb4) image
      , ac.background_color, ac.url, ac.category, ac.name_id, ac.data_type, ac.field_length
      , ac.lookup_list, ac.creatable, ac.help_text
      from avff_controls ac
      order by ac.id`
    ;
    // let values = [];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt);
    }

  },

  getScopeControls: function(callback = null) {

    // , CONVERT(ac.image USING utf8mb4) image

    const SQLstmt = `select ac.id, ac.name, ac.name code, ac.label, ac.label name, ac.entity_type, ac.scope_section
      , CONVERT(ac.image USING utf8mb4) image
      , ac.background_color, ac.url, ac.category, ac.name_id, ac.data_type, ac.field_length
      , ac.lookup_list, ac.creatable, ac.help_text
      from avff_controls ac
      where entity_type = "ACTION"
      and category <> 'SETUP'
      order by ac.id`
    ;
    // let values = [];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt);
    }

  },
  getAllRelationships: function(callback = null) {

    const SQLstmt = `select ar.id rship_id, ar.control_id, ar.parent_id
      , ar.order, ar.display_width, ar.column_width, ar.disabled, ar.hidden
      , ar.readonly, ar.required, ar.resizable, ar.z_index, ar.column_formatter
      , ar.header_formatter, ar.field_formatter, ar.label_formatter, ar.hide_label
      from avff_relationships ar
      order by ar.parent_id, ar.order, ar.id`
    ;
    // let values = [];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt);
    }

  },

  getTopMenu: function(callback = null) {

    // , CONVERT(ac.image USING utf8mb4) image

    const SQLstmt = `select ac.id, ac.name, ac.label, ac.entity_type, CONVERT(ac.image USING utf8mb4) image
      , ac.background_color, ac.url, ac.name_id, ac.data_type, ac.field_length
      , ac.lookup_list, ac.help_text

      , ar.id rship_id, ar.control_id, ar.parent_id
      , ar.order, ar.display_width, ar.column_width, ar.disabled, ar.hidden
      , ar.required, ar.resizable, ar.z_index, ar.column_formatter
      , ar.header_formatter, ar.field_formatter, ar.label_formatter, ar.hide_label
      from avff_controls ac
      left join avff_relationships ar on ac.id = ar.control_id
      where ar.parent_id IS NULL
      order by ar.order`
    ;
    // let values = [];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt);
    }

  },

  getChildren: function(parentID, callback = null) {

    const SQLstmt = `select ac.id, ac.name, ac.label, ac.entity_type, CONVERT(ac.image USING utf8mb4) image
      , ac.background_color, ac.url, ac.name_id, ac.data_type, ac.field_length
      , ac.lookup_list, ac.help_text

      , ar.id rship_id, ar.control_id, ar.parent_id
      , ar.order, ar.display_width, ar.column_width, ar.disabled, ar.hidden
      , ar.required, ar.resizable, ar.z_index, ar.column_formatter
      , ar.header_formatter, ar.field_formatter, ar.label_formatter, ar.hide_label
      left join avff_relationships ar on ac.id = ar.control_id
      where ar.parent_id = ?
      order by ar.order`
    ;

    let values = [parentID];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  addUpdControl: function(control, callback = null) {

    //inserting into mysql
    const { disable_date, created_by, last_updated_by }
      = control;

    const SQLstmt = `INSERT INTO avff_controls (id, name, label, description, entity_type
      , image, background_color, url, disable_date, created_by, last_updated_by)
     VALUES(?,?,?,?,?,?,?,?,?,? ,?)
     ON DUPLICATE KEY UPDATE name=?, label=?, description = ?, entity_type=?, image=?
     , background_color=?, url=?, disable_date=?, last_updated_by = ?`;

    const values = [contol_id, name, label, description, entity_type, image  // 6
    , background_color, url, disable_date, created_by, last_updated_by // 5

    , name, label, description, entity_type, image, background_color  // 6
    , url, disable_date, last_updated_by // 3
    ];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  disableControl: function(control, callback = null) {

    //inserting into mysql
    const {control_id, last_updated_by } = control;

    const SQLstmt = `UPDATE avff_controls
    SET disabled = ?, last_updated_by = ?
    WHERE id = ?`;

    const values = ['Y', last_updated_by, control_id];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  enableControl: function(control, callback = null) {

    //inserting into mysql
    const {control_id, last_updated_by } = control;

    const SQLstmt = `UPDATE avff_controls
    SET disabled = ?, last_updated_by = ?
    WHERE id = ?`;

    const values = [null, last_updated_by, control_id];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },

  deleteControl: function(control_id, callback = null) {

    //inserting into mysql
    // const {action_id, last_updated_by } = action;

    const SQLstmt = `DELETE from avff_controls WHERE id = ?`;

    const values = [control_id];

    if (callback) {
      // console.log('getPendingProjects: in the callback version');
      return sql().query(SQLstmt, values, callback);
    } else {
      // console.log('getPendingProjects: in the promise version');
      return sqlPromise(SQLstmt, values);
    }

  },
};

export default AvffModel;
