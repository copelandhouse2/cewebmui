import ContactModel from "../models/ContactModel";

// function to get the list of values based on lookup type: i.e STATE, COUNTRTY.
export const list = (request, response) => {

  // Listing from MySql;
  ContactModel.getContacts(function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Contacts: ', request.params.type);
      return response.json(rows);
    }
    else {
      console.log('Contacts: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get a lookup value based on a lookup code: i.e TX - Texas.
export const show = (request, response) => {

  // Listing from MySql;
  ContactModel.getContactByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Contact by ID');
      return response.json(rows[0]);
    }
    else {
      console.log('Contact: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to add a contact.
export const create = (request, response) => {

  ContactModel.addContact(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to update a contact.
export const update = (request, response) => {

  ContactModel.updateContact(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a contact.
export const remove = (request, response) => {

  ContactModel.deleteContact(request.params.id, function(err, result) {
    if (err) return response.json(err);
    return response.json("contact deleted");
  });
}