import { sql } from "../mysqldb";

const ContactModel = { 
  getContacts: function(callback) {
    const SQLstmt = 'select id, user_id, client_id, first_name, last_name, full_name, email, mobile'
    + ', other, role, active, comments from contacts';
    return sql().query(SQLstmt, callback);
  },

  getContactByID: function(id, callback){
    const SQLstmt = 'select id, user_id, client_id, first_name, last_name, full_name, email, mobile'
    + ', other, role, active, comments from contacts where id = ?';
    return sql().query(SQLstmt, [id], callback);
  },

  // This function handles BOTH ADD and UPDATE.
  // Basically an UPSERT feature.
  addContact: function(contact, callback){
    const SQLstmt = 'insert into contacts'
      + ' (id, user_id, client_id, first_name, last_name, full_name, email, mobile, other, role, active, comments'
      + ', created_by, last_updated_by)'
      + ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      + ' on duplicate key update user_id = ?, client_id = ?, first_name = ?, last_name = ?, full_name = ?'
      + ', email = ?, mobile = ?, other = ?, role = ?, active = ?, comments = ?, last_updated_by = ?';

    const values = [contact.id, contact.user_id, contact.client_id, contact.first_name, contact.last_name
      , contact.first_name+' '+contact.last_name, contact.email, contact.mobile, contact.other, contact.role
      , contact.active, contact.comments, contact.created_by, contact.last_updated_by
      , contact.user_id, contact.client_id, contact.first_name, contact.last_name, contact.first_name+' '+contact.last_name
      , contact.email, contact.mobile, contact.other, contact.role, contact.active, contact.comments
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