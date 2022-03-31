import { sql } from "../mysqldb";

const SQL_CONTACT_SELECT = `select c.id, c.id code, c.user_id, c.client_id, c.first_name, c.last_name, c.full_name, c.full_name name
, c.initials, c.email, c.mobile, c.other, c.requestor, c.designer, c.role, c.active, c.notes, concat('(',c.id,') ',c.full_name) label
, u.username, u.approved
from contacts c
left join users u on c.user_id = u.id`;

// const SQL_CONTACT_SELECT = `select id, id code, user_id, client_id
// , first_name, last_name, full_name, full_name name
// , email, mobile, other, requestor, role, active, notes, concat('(',id,') ',full_name) label
// from contacts`;

const ContactModel = {
  getContacts: function(callback) {
    const SQLstmt = SQL_CONTACT_SELECT;
    return sql().query(SQLstmt, callback);
  },

  getContactByID: function(id, callback){
    const SQLstmt = SQL_CONTACT_SELECT
    + ' where c.id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addContact: function(contact, callback){
    console.log("In addContact", contact)

    const SQLstmt = 'insert into contacts'
      + ' (id, user_id, client_id, first_name, last_name, full_name, initials, email, mobile, other, requestor, role, active, notes'
      + ', created_by, last_updated_by)'
      + ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      + ' on duplicate key update user_id = ?, client_id = ?, first_name = ?, last_name = ?, full_name = ?'
      + ', initials = ?, email = ?, mobile = ?, other = ?, requestor = ?, role = ?, active = ?, notes = ?, last_updated_by = ?';

    const values = [contact.id, contact.user_id, contact.client_id, contact.first_name, contact.last_name
      , contact.first_name+' '+contact.last_name, contact.initials, contact.email, contact.mobile, contact.other, contact.requestor, contact.role
      , contact.active, contact.notes, contact.created_by, contact.last_updated_by
      , contact.user_id, contact.client_id, contact.first_name, contact.last_name, contact.first_name+' '+contact.last_name
      , contact.initials, contact.email, contact.mobile, contact.other, contact.requestor, contact.role, contact.active, contact.notes
      , contact.last_updated_by];
    return sql().query(SQLstmt, values, callback);
  },

  deleteContact: function(id, callback){
    const SQLstmt = 'delete from contacts where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // right now, not using.  Leveraging the upsert functionality MySQL has.  See add.
  // updateContact: function(contact, callback){
  //   const SQLstmt = 'update contacts set name = ?, full_name = ?, compliance_dl = ?, active = ?'
  //     + ', notes = ?, last_updated_by = ? where id = ?';
  //   const values = [contact.name, contact.full_name, contact.compliance_dl, contact.active
  //     , contact.notes, contact.last_updated_by, contact.id];
  //   return sql().query(SQLstmt, values, callback);
  // }
};

export default ContactModel;
