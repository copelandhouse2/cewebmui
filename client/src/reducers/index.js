import {combineReducers} from "redux";

import avffReducer from './avff';
import cityReducer from './city';
import clientReducer from './client';
import contactReducer from './contact';
import geotechReducer from './geotech';
import organizationReducer from './organization';
import lookupReducer from './lookup';
import projectReducer from './project';
import subdivisionReducer from './subdivision';
import inspectionReducer from './inspection';

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

function preferences(state = {}, action) {
  if (action.type === "PREFERENCES_LOADED") {
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

function users(state = [], action) {
  if (action.type === "USERS_LOADED") {
    return action.value;
  }
  return state;
}


const rootReducer = combineReducers({
  session, preferences, message, users
  , ...avffReducer
  , ...cityReducer
  , ...clientReducer
  , ...contactReducer
  , ...geotechReducer
  , ...lookupReducer
  , ...projectReducer
  , ...subdivisionReducer
  , ...inspectionReducer
  , ...organizationReducer

});
export default rootReducer;
