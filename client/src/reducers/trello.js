function trelloInfo(state = [], action) {
  if (action.type === "TRELLO_SEED_LOADED") {
    return action.value;
  }
  return state;
}

const trelloReducer = { trelloInfo };

export default trelloReducer
