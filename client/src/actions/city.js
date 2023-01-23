/* CITIES ACTIONS */
// Loading the list of cities
export function loadCities() {
  return function (dispatch) {
    fetch("/cities")
    .then( (response) => {
      if (!response.ok) {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        });
      };
      // const responseJson = response.json();
      // console.log("City response.json", responseJson);
      return response.json();
    }).then((cities) => {
      dispatch(citiesLoaded(cities));
      // City list is small.  So if find string is empty, filling with city list.
      dispatch(findCities(null));
    }).catch((err) => {
        // console.log("Error loading cities", err.status, err.statusText)
    });
  };
}
function citiesLoaded(cities) {
  return {
    type: "CITIES_LOADED",
    value: cities
  };
}

// finding list of clients based on search string
export function findCities(findString) {
  // console.log('In findGeotechs');

  // City list is small.  So if find string is empty, filling with city list.
  if (!findString) {
    return function (dispatch, getState) {
      const { cities } = getState();
      dispatch(citiesFound(null, cities));
    }
  }

  return function (dispatch) {
    fetch(`/citysearch/${findString}`)
    .then( (response) => {
      return response.json();
    }).then((cities) => {
      // console.log('geos', geos);
      dispatch(citiesFound(findString, cities));
    });
  };
}
function citiesFound(findString, clients) {
  return {
    type: "CITY_SEARCH_LOADED",
    value: {
      find: findString,
      findResults: clients
    }
  };
}

// Action to create the City.  Used by City Dialog
export function createCity(c) {
  return function (dispatch) {
    fetch("/cityadd", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadCities()));
  };
}

// Action to add or update the Client
export function saveCities(c) {
  return function (dispatch, getState) {
    const { citySearch } = getState();
    fetch("/cities", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('saveClient response', response);
      dispatch(loadCities())
      dispatch(findCities(citySearch.find));
      // console.log('after dispatch load clients', response);
      // return response;
    });
  };
}

// Action to delete the City
export function deleteCity(id) {
  return function (dispatch, getState) {
    const { citySearch } = getState();
    fetch(`/cities/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(loadCities())
      dispatch(findCities(citySearch.find));
    });
  };
}

export function showHideCityDialog() {
  return {
    type: 'SHOW_CITY_DIALOG'
  };
}
