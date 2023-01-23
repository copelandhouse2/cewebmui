function pageTitle(state = '', action) {
  if (action.type === "TITLE_LOADED") {
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

function localView(state = {}, action) {
  if (action.type === "LOCAL_VIEW_LOADED") {
    return action.value;
  }
  return state;
}

const avffReducerReducer = { pageTitle, avffControls, avffRelationships
  , currentMenu, currentViews, currentProject, localView };

export default avffReducerReducer
