/* CONTACTS ACTIONS */
// Loading the list of contacts, requestors, and users
export function loadContacts() {
  return function (dispatch) {
    fetch("/contacts")
    .then( (response) => {
      return response.json();
    }).then((contacts) => {
      dispatch(contactsLoaded(contacts));
      const requestors = contacts.filter(c => c.requestor === 'Y');
      // users with DESIGNER, ARCH, ENG roles...  need to change.
      const designers = contacts.filter(c => c.role === 'DESIGN'||c.role==='ENG'||c.role==='ARCH');
      // users with INSPECTION role
      const inspectors = contacts.filter(c => c.role === 'INSPECTOR');
      // console.log('the requestors', requestors);
      dispatch(requestorsLoaded(requestors));
      dispatch(designersLoaded(designers));
      dispatch(inspectorsLoaded(inspectors));

    });
  };
}
function contactsLoaded(contacts) {
  return {
    type: "CONTACTS_LOADED",
    value: contacts
  };
}
function requestorsLoaded(requestors) {
  return {
    type: "REQUESTORS_LOADED",
    value: requestors
  };
}
function designersLoaded(designers) {
  return {
    type: "DESIGNERS_LOADED",
    value: designers
  };
}
function inspectorsLoaded(inspectors) {
  return {
    type: "INSPECTORS_LOADED",
    value: inspectors
  };
}
// Action to create the Contact
export function createContact(c) {
  return function (dispatch) {
    fetch("/contacts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadContacts()));
  };
}

// Action to delete the Contact
export function deleteContact(id) {
  return function (dispatch) {
    fetch(`/contacts/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadContacts()));
  };
}

export function showHideContactDialog() {
  return {
    type: 'SHOW_CONTACT_DIALOG'
  };
}
