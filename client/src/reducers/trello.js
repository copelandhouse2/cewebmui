function trelloToken(state = null, action) {
  if (action.type === "TRELLO_TOKEN_LOADED") {
    return action.value;
  }
  return state;
}

function trelloInfo(state = [], action) {
  if (action.type === "TRELLO_SEED_LOADED") {
    return action.value;
  }
  return state;
}

const trelloReducer = { trelloToken, trelloInfo };

export default trelloReducer
