import {combineReducers} from "redux";

function session(state = {}, action) {
  if (action.type === "SESSION_LOADED") {
    return action.value;
  }
  return state;
}

function addresses(state = [], action) {
  if (action.type === "ADDRESSES_LOADED") {
    return action.value;
  }
  return state;
}

function address(state = [], action) {
  if (action.type === "GET_ADDRESS_DONE") {
    return action.value;
  }
  return state;
}

function clients(state = [], action) {
  if (action.type === "CLIENTS_LOADED") {
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

function cities(state = [], action) {
  if (action.type === "CITIES_LOADED") {
    return action.value;
  }
  return state;
}

function subdivisions(state = [], action) {
  if (action.type === "SUBDIVISIONS_LOADED") {
    return action.value;
  }
  return state;
}

function jobnumberseqs(state = [], action) {
  if (action.type === "JOBNUMBERSEQS_LOADED") {
    return action.value;
  }
  return state;
}

function stateLookup(state = [], action) {
  if (action.type === "STATELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function countryLookup(state = [], action) {
  if (action.type === "COUNTRYLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}
const rootReducer = combineReducers({
  session, addresses, address, clients, contacts, cities
  , subdivisions, jobnumberseqs, stateLookup, countryLookup
});
export default rootReducer;
