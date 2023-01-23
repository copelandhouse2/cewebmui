/* GEOTECH ACTIONs */
// Loading the list of geotechs
export function loadOrganizations() {
  // console.log('In geotech');
  return function (dispatch) {
    fetch('/orgs')
    .then( (response) => {
      return response.json();
    }).then((orgs) => {
      // console.log('orgs', orgs);
      dispatch(orgsLoaded(orgs));
      // Geotech list is small.  So if find string is empty, filling with geo list.
      // dispatch(findOrganizations(null));

    });
  };
}
function orgsLoaded(orgs) {
  // console.log('orgs Loaded', orgs);

  return {
    type: "ORGS_LOADED",
    value: orgs
  };
}

// finding list of geotechs based on search string
export function findOrganizations(findString) {
  // console.log('In findGeotechs');

  // Geotech list is small.  So if find string is empty, filling with geo list.
  if (!findString) {
    return function (dispatch, getState) {
      const { orgs } = getState();
      dispatch(orgsFound(null, orgs));
    }
  }

  return function (dispatch) {
    fetch(`/orgsearch/${findString}`)
    .then( (response) => {
      return response.json();
    }).then((orgs) => {
      console.log('orgs', orgs);
      dispatch(orgsFound(findString, orgs));
    });
  };
}
function orgsFound(findString, orgs) {
  return {
    type: "ORG_SEARCH_LOADED",
    value: {
      find: findString,
      findResults: orgs
    }
  };
}

// Action to save the revisions
export function saveOrganizations(orgs) {
  return function (dispatch) {
    // console.log('saveRevisions', project_id, revs);
    fetch("/orgs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(orgs)
    }).then(() => dispatch(loadOrganizations()));
  };
}

// Action to delete the Subdivision
export function deleteOrganization(id) {
  return function (dispatch) {
    fetch(`/orgs/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadOrganizations()));
  };
}

// Loading the list of geotechs
// export function loadGeoMasterData(geo_id) {
//   // console.log('In masterData');
//
//   return function (dispatch) {
//     fetch(`/geomasterdata/${geo_id}`)
//     .then( (response) => {
//       // console.log('response', response);
//       return response.json();
//     }).then((masterData) => {
//       // console.log('masterData', masterData);
//       dispatch(geoMasterDataLoaded(masterData));
//     });
//   };
// }
// function geoMasterDataLoaded(masterData) {
//   return {
//     type: "GEO_MASTER_DATA_LOADED",
//     value: masterData
//   };
// }
