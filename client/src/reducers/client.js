function clients(state = [], action) {
  if (action.type === "CLIENTS_LOADED") {
    return action.value;
  }
  return state;
}

function currentClient(state = {}, action) {
  if (action.type === "CLIENT_DATA_LOADED") {
    return action.value;
  }
  return state;
}

function clientSearch(state = {}, action) {
  if (action.type === "CLIENT_SEARCH_LOADED") {
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

const clientReducer = { clients, currentClient, clientSearch, showClientDialog };

export default clientReducer
