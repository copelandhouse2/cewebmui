/* GEOTECH ACTIONs */
// Loading the list of geotechs
export function loadGeotechs() {
  // console.log('In geotech');
  return function (dispatch) {
    fetch('/geos')
    .then( (response) => {
      return response.json();
    }).then((geos) => {
      // console.log('geos', geos);
      dispatch(geosLoaded(geos));
      // Geotech list is small.  So if find string is empty, filling with geo list.
      dispatch(findGeotechs(null));

    });
  };
}
function geosLoaded(geos) {
  return {
    type: "GEOS_LOADED",
    value: geos
  };
}

// finding list of geotechs based on search string
export function findGeotechs(findString) {
  // console.log('In findGeotechs');

  // Geotech list is small.  So if find string is empty, filling with geo list.
  if (!findString) {
    return function (dispatch, getState) {
      const { geos } = getState();
      dispatch(geosFound(null, geos));
    }
  }

  return function (dispatch) {
    fetch(`/geosearch/${findString}`)
    .then( (response) => {
      return response.json();
    }).then((geos) => {
      // console.log('geos', geos);
      dispatch(geosFound(findString, geos));
    });
  };
}
function geosFound(findString, geos) {
  return {
    type: "GEO_SEARCH_LOADED",
    value: {
      find: findString,
      findResults: geos
    }
  };
}

// Loading the list of geotechs
export function loadGeoMasterData(geo_id) {
  // console.log('In masterData');

  return function (dispatch) {
    fetch(`/geomasterdata/${geo_id}`)
    .then( (response) => {
      // console.log('response', response);
      return response.json();
    }).then((masterData) => {
      // console.log('masterData', masterData);
      dispatch(geoMasterDataLoaded(masterData));
    });
  };
}
function geoMasterDataLoaded(masterData) {
  return {
    type: "GEO_MASTER_DATA_LOADED",
    value: masterData
  };
}

// Action to save the revisions
export function saveGeotechs(geos) {
  return function (dispatch) {
    // console.log('saveRevisions', project_id, revs);
    fetch("/geos", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(geos)
    }).then(() => dispatch(loadGeotechs()));
  };
}

// Action to delete the Subdivision
export function deleteGeotech(id) {
  return function (dispatch) {
    fetch(`/geos/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadGeotechs()));
  };
}
