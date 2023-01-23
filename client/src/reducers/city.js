function cities(state = [], action) {
  if (action.type === "CITIES_LOADED") {
    return action.value;
  }
  return state;
}

function citySearch(state = {}, action) {
  if (action.type === "CITY_SEARCH_LOADED") {
    return action.value;
  }
  return state;
}

function showCityDialog(state = false, action) {
  if (action.type === "SHOW_CITY_DIALOG") {
    return !state;
  }
  return state;
}

const cityReducer = { cities, citySearch, showCityDialog };

export default cityReducer
