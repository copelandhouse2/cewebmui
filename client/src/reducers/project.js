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

function saveType(state = [], action) {
  if (action.type === "SAVE_TYPES_LOADED") {
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

function search(state = {}, action) {
  if (action.type === "SEARCH_UPDATED") {
    return action.value;
  }
  return state;
}

const projectReducer = { addresses, dups, address, saveType, projectHistory
  , projectRevisions, search };

export default projectReducer
