import {combineReducers} from "redux";

function session(state = {}, action) {
  if (action.type === "SESSION_LOADED") {
    return action.value;
  }
  return state;
}

function message(state = {}, action) {
  if (action.type === "MESSAGE_LOADED") {
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

function roleLookup(state = [], action) {
  if (action.type === "ROLELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function trelloListLookup(state = [], action) {
  if (action.type === "TRELLOLISTLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function recordStatusLookup(state = [], action) {
  if (action.type === "RECORDSTATUSLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function projectStatusLookup(state = [], action) {
  if (action.type === "PROJECTSTATUSLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function scopeLookup(state = [], action) {
  if (action.type === "SCOPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function masonryLookup(state = [], action) {
  if (action.type === "MASONRYLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function ynLookup(state = [], action) {
  if (action.type === "YNLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function fndTypeLookup(state = [], action) {
  if (action.type === "FNDTYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function garageTypeLookup(state = [], action) {
  if (action.type === "GARAGETYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function garageEntryLookup(state = [], action) {
  if (action.type === "GARAGEENTRYLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function garageSwingLookup(state = [], action) {
  if (action.type === "GARAGESWINGLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function floorTypeLookup(state = [], action) {
  if (action.type === "FLOORTYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function roofTypeLookup(state = [], action) {
  if (action.type === "ROOFTYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function showClientDialog(state = false, action) {
  if (action.type === "SHOW_CLIENT_DIALOG") {
    return !state;
  }
  return state;
}

function showContactDialog(state = false, action) {
  if (action.type === "SHOW_CONTACT_DIALOG") {
    return !state;
  }
  return state;
}

function showSubdivisionDialog(state = false, action) {
  if (action.type === "SHOW_SUB_DIALOG") {
    return !state;
  }
  return state;
}

function showCityDialog(state = false, action) {
  if (action.type === "SHOW_CITY_DIALOG") {
    return !state;
  }
  return state;
}

const rootReducer = combineReducers({
  session, message, addresses, address, clients, contacts, cities
  , subdivisions, jobnumberseqs, stateLookup, countryLookup
  , roleLookup, trelloListLookup, showClientDialog, showSubdivisionDialog
  , showCityDialog, showContactDialog, recordStatusLookup, projectStatusLookup
  , scopeLookup, masonryLookup, ynLookup, fndTypeLookup, garageTypeLookup
  , garageEntryLookup, garageSwingLookup, floorTypeLookup, roofTypeLookup
});
export default rootReducer;
