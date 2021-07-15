function organizations(state = [], action) {
  if (action.type === "ORGS_LOADED") {
    return action.value;
  }
  return state;
}

function orgSearch(state = {}, action) {
  if (action.type === "ORG_SEARCH_LOADED") {
    return action.value;
  }
  return state;
}

// function geoMasterData(state = [], action) {
//   if (action.type === "GEO_MASTER_DATA_LOADED") {
//     return action.value;
//   }
//   return state;
// }

const organizationReducer = { organizations, orgSearch };

export default organizationReducer
