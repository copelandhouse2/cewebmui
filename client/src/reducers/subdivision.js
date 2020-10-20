function subdivisions(state = [], action) {
  if (action.type === "SUBDIVISIONS_LOADED") {
    return action.value;
  }
  return state;
}

function subSearch(state = {}, action) {
  if (action.type === "SUBDIVISION_SEARCH_LOADED") {
    return action.value;
  }
  return state;
}

function showSubdivisionDialog(state = false, action) {
  if (action.type === "SHOW_SUB_DIALOG") {
    return !state;
  }
  return state;
}

const subdivisionReducer = { subdivisions, subSearch, showSubdivisionDialog };

export default subdivisionReducer
