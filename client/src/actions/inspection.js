/* INSPECTION ACTIONS */
// Loading the list of inspections
export function loadInspections(choice_type, choice_id, date_range) {
  return function (dispatch, getState) {
    // console.log('loadInspections start',choice_type, choice_id, date_range);

    const { inspections } = getState();

    fetch(`/inspections/list/${choice_type}/${choice_id}/${date_range}`)
    .then( (response) => {
      // if (!response.ok) {
      //   return Promise.reject({
      //     status: response.status,
      //     statusText: response.statusText
      //   });
      // };
      // const responseJson = response.json();
      // console.log("inspection response.json", response);
      return response.json();
    }).then((list) => {
      let updatedInsp = {...inspections};
      updatedInsp.choice_type = choice_type;
      updatedInsp.choice_id = choice_id;
      updatedInsp.date_range = date_range;
      updatedInsp.results = [...list];
      dispatch(inspectionsLoaded(updatedInsp));
      // City list is small.  So if find string is empty, filling with city list.
      //dispatch(findCities(null));
    }).catch((err) => {
        console.log("Error loading inspections", err.status, err.statusText)
    });
  };
}

export function loadPrevProjectInspections(proj_id, cur_insp_id=null) {
  return function (dispatch, getState) {
    // console.log('loadPrevProjectInspections start', proj_id, cur_insp_id);

    const { inspections } = getState();
    // console.log('loadPrevProjectInspections after getState', inspections);

    fetch(`/inspections/project/${proj_id}/${cur_insp_id}`)
    .then( (response) => {
      return response.json();
    }).then((list) => {
      let updatedInsp = {...inspections};
      updatedInsp.pastProjectSpecific = [...list];
      // console.log('loadPrevProjectInspections then', updatedInsp);
      dispatch(inspectionsLoaded(updatedInsp));
    }).catch((err) => {
        console.log("Error loading inspections", err.status, err.statusText)
    });
  };
}
function inspectionsLoaded(updatedInsp) {
  // console.log('inspectionsLoaded', updatedInsp);
  return {
    type: "INSPECTIONS_LOADED",
    value: updatedInsp
  };
}

// Used by Inspection module to search for inspections by many ways
// inspector, address, client, cable company, status.
export function filterChoices(findString) {
  // console.log('In filterChoices', findString);

  // If string is empty, user just hit enter.  Ignore.
  if (!findString) {
    return function (dispatch, getState) {
      const { inspections } = getState();
      let updatedInsp = {...inspections};
      updatedInsp.find = null;
      updatedInsp.filter = [];
      // updatedInsp.choice_type = 'INSPECTOR';
      // updatedInsp.choice_id = session.contact_id;
      // updatedInsp.results = [];
      dispatch(inspectionsLoaded(updatedInsp));
      // dispatch(loadInspections('INSPECTOR',session.contact_id));
    }
  } else {
    return function (dispatch, getState) {
      const { inspections } = getState();
      fetch(`/inspectionfilter/${findString}`)
      .then( (response) => {
        return response.json();
      }).then((choices) => {
        // console.log('geos', geos);
        let updatedInsp = {...inspections};
        updatedInsp.find = findString;
        updatedInsp.filter = [...choices];
        // don't need to update date range.
        // updatedInsp.date_range = date_range;
        // console.log('filterChoices: got values',updatedInsp);
        dispatch(inspectionsLoaded(updatedInsp));
      });
    };
  }

}

// Used by Inspection Dialog to look for Projects
export function filterProjects(findString) {
  // console.log('In filterProjects', findString);

  // If string is empty, user just hit enter.  Ignore.
  if (!findString) {
    return function (dispatch, getState) {
      const { inspections } = getState();
      let updatedInsp = {...inspections};
      updatedInsp.find = null;
      updatedInsp.filter = [];
      // updatedInsp.choice_type = 'INSPECTOR';
      // updatedInsp.choice_id = session.contact_id;
      // updatedInsp.results = [];
      dispatch(inspectionsLoaded(updatedInsp));
      // dispatch(loadInspections('INSPECTOR',session.contact_id));
    }
  } else {
    return function (dispatch, getState) {
      const { inspections } = getState();
      fetch(`/inspectionfilter/projects/${findString}`)
      .then( (response) => {
        return response.json();
      }).then((choices) => {
        // console.log('project choices', choices);
        let updatedInsp = {...inspections};
        updatedInsp.find = findString;
        updatedInsp.filter = [...choices];
        // console.log('filterProjects: got values',updatedInsp);
        dispatch(inspectionsLoaded(updatedInsp));
      });
    };
  }

}

// Action to add or update the Client
export function saveInspections(c) {
  return function (dispatch, getState) {
    const { inspections } = getState();
    fetch("/inspections", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('saveClient response', response);
      dispatch(loadInspections(inspections.choice_type, inspections.choice_id, inspections.date_range));
      // console.log('after dispatch load clients', response);
      // return response;
    });
  };
}

export function editInspection(proj_id, cur_insp_id=null) {
  return function (dispatch, getState) {
    // console.log('editInspection start', proj_id, cur_insp_id);

    const { inspections } = getState();
    // console.log('editInspection after getState', inspections);

    fetch(`/inspections/project/${proj_id}/${cur_insp_id}`)
    .then( (response) => {
      return response.json();
    }).then((allData) => {
      // console.log('editInspection allData', allData);
      let updatedInsp = {...inspections};
      updatedInsp.find = allData.project.job_number;
      updatedInsp.filter = [{...allData.project}];
      updatedInsp.pastProjectSpecific = [...allData.inspections];
      // console.log('editInspection then', updatedInsp);
      dispatch(inspectionsLoaded(updatedInsp));
      // return ('done');
    }).catch((err) => {
        console.log("Error loading inspections", err.status, err.statusText)
    });
  };
}

// Action to delete the City
export function deleteInspection(id) {
  return function (dispatch, getState) {
    const { inspections } = getState();
    fetch(`/inspections/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(loadInspections(inspections.choice_type, inspections.choice_id, inspections.date_range));
    });
  };
}
