import {combineReducers} from "redux";

function pageTitle(state = '', action) {
  if (action.type === "TITLE_LOADED") {
    return action.value;
  }
  return state;
}

function session(state = {}, action) {
  if (action.type === "SESSION_LOADED") {
    return action.value;
  }
  if (action.type === "SETTINGS_UPDATED") {
    // console.log('reducer: state, action.value', state, action.value);
    return action.value;
    // return state;
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

function dups(state = [], action) {
  if (action.type === "DUPS_LOADED") {
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

function users(state = [], action) {
  if (action.type === "USERS_LOADED") {
    return action.value;
  }
  return state;
}

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

function classificationLookup(state = [], action) {
  if (action.type === "CLASSIFICATIONLOOKUP_LOADED") {
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

function coveredPatioLookup(state = [], action) {
  if (action.type === "COVEREDPATIO_LOADED") {
    return action.value;
  }
  return state;
}

function pitaLookup(state = [], action) {
  if (action.type === "PITA_LOADED") {
    return action.value;
  }
  return state;
}

function dwellingTypeLookup(state = [], action) {
  if (action.type === "DWELLINGTYPE_LOADED") {
    return action.value;
  }
  return state;
}

function dateSearchLookup(state = [], action) {
  if (action.type === "DATESEARCH_LOADED") {
    return action.value;
  }
  return state;
}

function revReasonLookup(state = [], action) {
  if (action.type === "REVREASON_LOADED") {
    return action.value;
  }
  return state;
}

function revRespLookup(state = [], action) {
  if (action.type === "REVRESP_LOADED") {
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

function geos(state = [], action) {
  if (action.type === "GEOS_LOADED") {
    return action.value;
  }
  return state;
}

function geoMasterData(state = [], action) {
  if (action.type === "GEO_MASTER_DATA_LOADED") {
    return action.value;
  }
  return state;
}

function avffControls(state = [], action) {
  if (action.type === "CONTROLS_LOADED") {
    return action.value;
  }
  return state;
}

function avffRelationships(state = [], action) {
  if (action.type === "RELATIONSHIPS_LOADED") {
    return action.value;
  }
  return state;
}

function currentMenu(state = {}, action) {
  if (action.type === "CURRENT_MENU_LOADED") {
    return action.value;
  }
  return state;
}

function currentViews(state = [], action) {
  if (action.type === "VIEWS_LOADED") {
    return action.value;
  }
  return state;
}

function currentProject(state = {}, action) {
  if (action.type === "INITIAL_SCOPE_LOADED") {
    return action.value;
  }
  if (action.type === "UPDATE_PROJECT") {
    return action.value;
  }
  if (action.type === "CLEAR_PROJECT") {
    return action.value;
  }
  return state;
}

function saveType(state = [], action) {
  if (action.type === "SAVE_TYPES_LOADED") {
    return action.value;
  }
  return state;
}

function search(state = {}, action) {
  if (action.type === "SEARCH_UPDATED") {
    return action.value;
  }
  return state;
}

function localView(state = {}, action) {
  if (action.type === "LOCAL_VIEW_LOADED") {
    return action.value;
  }
  return state;
}

function projectHistory(state = [], action) {
  if (action.type === "PROJECT_HISTORY_LOADED") {
    return action.value;
  }
  return state;
}

function projectRevisions(state = [], action) {
  if (action.type === "PROJECT_REVISIONS_LOADED") {
    return action.value;
  }
  return state;
}
const rootReducer = combineReducers({
  pageTitle, session, message, addresses, dups, address, clients, contacts, cities
  , subdivisions, jobnumberseqs, stateLookup, countryLookup
  , roleLookup, trelloListLookup, showClientDialog, showSubdivisionDialog
  , showCityDialog, showContactDialog, recordStatusLookup, projectStatusLookup
  , scopeLookup, classificationLookup, masonryLookup, ynLookup, fndTypeLookup, garageTypeLookup
  , garageEntryLookup, garageSwingLookup, floorTypeLookup, roofTypeLookup
  , coveredPatioLookup, dwellingTypeLookup, pitaLookup, geos, geoMasterData
  , avffControls, avffRelationships, currentMenu, currentViews, currentProject
  , requestors, saveType, search, localView, projectHistory, users
  , dateSearchLookup, revReasonLookup, revRespLookup, designers, projectRevisions
});
export default rootReducer;
