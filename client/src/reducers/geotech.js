function geos(state = [], action) {
  if (action.type === "GEOS_LOADED") {
    return action.value;
  }
  return state;
}

function geoSearch(state = {}, action) {
  if (action.type === "GEO_SEARCH_LOADED") {
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


const geotechReducer = { geos, geoSearch, geoMasterData };

export default geotechReducer
