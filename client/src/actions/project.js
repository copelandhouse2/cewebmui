import { loadMessage } from './index';
/* ADDRESSES ACTIONS */
// Loading the list of addresses
export function loadProjects(search) {
  return function (dispatch) {
    const urlString = `:${search.pendingOnly}`
      + `/:${search.dateRange}`
      + `/:${search.enteredBy}`
      + `/:${search.jobNumber}`
      + `/:${search.address}`
      + `/:${search.requestedBy}`
      + `/:${search.client}`
      + `/:${search.city}`
      + `/:${search.subdivision}`
      + `/:${search.status}`
      ;
    fetch(`/projects/${urlString}`)
    .then( (response) => {
      return response.json();
    }).then((projects) => {
      dispatch(projectsLoaded(projects));
    });
  };
}

export function loadPending(userID) {
  return function (dispatch) {
    fetch(`/pending/${userID}`)
    .then( (response) => {
      return response.json();
    }).then((projects) => {
      dispatch(projectsLoaded(projects));
    });
  };
}

function projectsLoaded(projects) {
  return {
    type: "ADDRESSES_LOADED",
    value: projects
  };
}

export function loadRecents(searchFilter = null) {
  return function (dispatch, getState) {
    const { search, session } = getState();
    // console.log('.then loadRecents 1', search);
    const searchVal = searchFilter?searchFilter:search.recents;
    // console.log('In loadRecents', searchVal);
    fetch(`/recents/v2.0/${session.id}/${searchVal}`)
    .then( (response) => {
      return response.json();
    }).then((projects) => {
      let updatedSearch = {...search};
      updatedSearch.recents = searchVal;
      updatedSearch.recentsResults = [...projects];
      // console.log('.then loadRecents 2', updatedSearch);
      dispatch(searchLoaded(updatedSearch));
    });
  };
}

export function loadFind(searchFilter, searchFields = null) {
  return function (dispatch, getState) {
    let urlString = `${searchFilter}`;  // default
    if (searchFields && !searchFilter) {
      const { job_number, address1, date_search, client_id
        , subdivision, city, user_id, contact_id, status, last_updated_by } = searchFields;
      urlString = `:${job_number||'null'}`
        + `/:${address1||'null'}`
        + `/:${date_search||'null'}`
        + `/:${client_id||'null'}`
        + `/:${subdivision||'null'}`
        + `/:${city||'null'}`
        + `/:${user_id||'null'}`
        + `/:${contact_id||'null'}`
        + `/:${status||'null'}`
        + `/:${last_updated_by||'null'}`
        ;
    }
    // console.log('loadFind', urlString);
    fetch(`/find/v2.0/${urlString}`)
    .then( (response) => {
      return response.json();
    }).then((projects) => {
      const { search } = getState();
      // console.log('.then loadFind 1', search);
      let updatedSearch = {...search};
      updatedSearch.find = searchFilter;
      updatedSearch.findResults = [...projects];
      // console.log('.then loadFind 2', updatedSearch);
      dispatch(searchLoaded(updatedSearch));
      return true;
    });
  };
}

function searchLoaded(search) {
    // console.log('searchLoaded', search);
    return {
    type: "SEARCH_UPDATED",
    value: search
  };
}

// Action to test for possible duplicates.  Right now 2 tests...
// 1. address dup test
// 2. Subdivision, phase, section, lot, block dup test
export function searchForDups(test, project) {
  return function (dispatch) {
    const urlString = `:${test}`
      + `/:${project.address1}`
      + `/:${project.subdivision}`
      + `/:${project.phase}`
      + `/:${project.section}`
      + `/:${project.block}`
      + `/:${project.lot}`;
    fetch(`/dups/${urlString}`)
    .then( (response) => {
      return response.json();
    }).then((dups) => {
      dispatch(dupsLoaded(dups));
    });
  };
}

export function clearDups() {
  return function (dispatch) {
    dispatch(dupsLoaded([]));
  };
}

function dupsLoaded(dups) {
  return {
    type: "DUPS_LOADED",
    value: dups
  };
}

// Action to create the Address
export function createAddress(c, v2 = false, updateSearch = false) {
  // console.log('Just in createAddress', c)
  return function (dispatch, getState) {
    // console.log('createAddress', v2);
    fetch(`/projects/${v2}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('createAddress', response);
      if (response.errno) {
        console.log('Error: create Address', response);  // now has insertId
      }
      // console.log('createAddress loadRecents');
      dispatch(loadRecents());
      return response;  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      if (updateSearch) {
        const { search } = getState();
        // console.log('createAddress loadFind');
        dispatch(loadFind(search.find, null));
      }
      // dispatch(loadMessage(
      //   { ok:false,
      //     status: `New / Updated Job #`,
      //     statusText: response.job_number
      //   }, 'INFO'));
    });
  };
}

// Action to create the Address
export function commitAddresses(userID, c, create, v2 = false, updateSearch = false) {
  return function (dispatch, getState) {
    // console.log('in commitAddress function', userID, create, v2);
    fetch(`/commits/${userID}/${create}/${v2}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
      , body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      if (response.errno) {
        console.log('2nd .then ERROR commit Address', response);
        throw response;
      };
      // console.log('update recents');
      dispatch(loadRecents());
      if (updateSearch) {
        const { search } = getState();
        // console.log('update find');
        dispatch(loadFind(search.find, null));
      }
      // dispatch(loadMessage(
      //   { ok:false,
      //     status: `New / Updated Job #`,
      //     statusText: response.job_number
      //   }, 'INFO'));
    }).catch(err => {
      dispatch(loadMessage(
        { ok:false,
          status: `${err.errno}:${err.code}`,
          statusText: err.sqlMessage
        }, "ERROR"));
    });
  };
}

// Adding the calls to fetch 1 entity.
export function getAddress(id) {
  return function (dispatch) {
    fetch(`/projects/${id}`)
    .then( (response) => {
      return response.json();
    }).then((address) => {
      dispatch(getAddressDone(address));
    });
  };
}
function getAddressDone(address) {
  return {
    type: "GET_ADDRESS_DONE",
    value: address
  };
}

// Action to create the Address
export function deleteAddress(id, search) {
  // console.log('deleteAddress',id)
  return function (dispatch) {
    fetch(`/projects/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(loadProjects(search));
    });
  };
}

// Action to create the Address
export function deleteProject(id) {
  // console.log('deleteAddress',id)
  return function (dispatch, getState) {
    fetch(`/projects/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(loadRecents());
      const { search } = getState();
      // console.log('createAddress loadFind');
      dispatch(loadFind(search.find, null));
    });
  };
}

// Pulling the Project History.  Revisions right now.
export function loadProjectHistory(project_id, clear=false) {
  return function (dispatch) {
    if (clear) {
      // console.log('loadLocalView: clearing');
      dispatch(projectHistoryLoaded([]));
    } else {
      fetch(`/projecthistory/${project_id}`)
      .then( (response) => {
        return response.json();
      }).then((history) => {
        // console.log('geos', geos);
        dispatch(projectHistoryLoaded(history));
      });
    }
  };
}
function projectHistoryLoaded(history) {
  return {
    type: "PROJECT_HISTORY_LOADED",
    value: history
  };
}

// Pulling the Project Revisions.
export function loadProjectRevisions(project_id, clear=false) {
  return function (dispatch) {
    if (clear) {
      // console.log('loadLocalView: clearing');
      dispatch(projectRevisionsLoaded([]));
    } else {
      fetch(`/revisions/${project_id}`)
      .then( (response) => {
        return response.json();
      }).then((revisions) => {
        // console.log('geos', geos);
        dispatch(projectRevisionsLoaded(revisions));
      });
    }
  };
}
function projectRevisionsLoaded(revisions) {
  return {
    type: "PROJECT_REVISIONS_LOADED",
    value: revisions
  };
}


// Action to save the revisions
export function saveRevisions(project_id, revs) {
  return function (dispatch) {
    // console.log('saveRevisions', project_id, revs);
    fetch("/revisions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(revs)
    }).then(() => dispatch(loadProjectRevisions(project_id)));
  };
}

// Action to delete the Subdivision
export function deleteRevision(project_id, id) {
  return function (dispatch) {
    fetch(`/revisions/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadProjectRevisions(project_id)));
  };
}
