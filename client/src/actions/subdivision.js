/* SUBDIVISIONS ACTIONS */
// Loading the list of subdivisions
export function loadSubdivisions() {
  return function (dispatch) {
    fetch("/subdivisions")
    .then( (response) => {
      return response.json();
    }).then((subdivisions) => {
      dispatch(subdivisionsLoaded(subdivisions));
    });
  };
}
function subdivisionsLoaded(subdivisions) {
  return {
    type: "SUBDIVISIONS_LOADED",
    value: subdivisions
  };
}

// finding list of clients based on search string
export function findSubdivisions(findString) {
  // console.log('In findGeotechs');

  // find string is empty, clearing out find.
  if (!findString) {
    return function (dispatch) {
      dispatch(subdivisionsFound(null, []));
    }
  }

  return function (dispatch) {
    fetch(`/subdivisionsearch/${findString}`)
    .then( (response) => {
      return response.json();
    }).then((subdivisions) => {
      // console.log('found subs', subdivisions);
      dispatch(subdivisionsFound(findString, subdivisions));
    });
  };
}
function subdivisionsFound(findString, subdivisions) {
  return {
    type: "SUBDIVISION_SEARCH_LOADED",
    value: {
      find: findString,
      findResults: subdivisions
    }
  };
}

// Action to create the Subdivision
export function createSubdivision(c) {
  return function (dispatch) {
    fetch("/subdivisionadd", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadSubdivisions()));
  };
}

// Action to add or update the Client
export function saveSubdivisions(c) {
  return function (dispatch, getState) {
    const { subSearch } = getState();
    fetch("/subdivisions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('saveClient response', response);
      dispatch(loadSubdivisions())
      dispatch(findSubdivisions(subSearch.find));
      // console.log('after dispatch load clients', response);
      // return response;
    });
  };
}

// Action to delete the Subdivision
export function deleteSubdivision(id) {
  return function (dispatch, getState) {
    const { subSearch } = getState();
    fetch(`/subdivisions/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(loadSubdivisions())
      dispatch(findSubdivisions(subSearch.find));
    });
  };
}

export function showHideSubdivisionDialog() {
  return {
    type: 'SHOW_SUB_DIALOG'
  };
}
