function requestors(state = [], action) {
  if (action.type === "REQUESTORS_LOADED") {
    return action.value;
  }
  return state;
}

function designers(state = [], action) {
  if (action.type === "DESIGNERS_LOADED") {
    return action.value;
  }
  return state;
}

function contacts(state = [], action) {
  if (action.type === "CONTACTS_LOADED") {
    return action.value;
  }
  return state;
}

function showContactDialog(state = false, action) {
  if (action.type === "SHOW_CONTACT_DIALOG") {
    return !state;
  }
  return state;
}

const contactReducer = { requestors, designers, contacts, showContactDialog };

export default contactReducer
