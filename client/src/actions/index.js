// import AlertDialog from "../components/AlertDialog";
// import { STATUS_CODES } from "http";

/* SESSION ACTION */
// Loading the list of addresses
export function loadSession(username) {
  // console.log('loadSession', username);
  return function (dispatch, getState) {
    const {search} = getState();
    // console.log('loadSession', search);
    fetch(`/session/${username}`)
    .then( (response) => {
      // console.log('response', response);
      return response.json();
    }).then((session) => {
      // console.log('loadSession response', session)
      // settings are hardcoded right now.
      // session.settings = {accentColor: '#42a5f5', }
      dispatch(sessionLoaded(session));
      // console.log('sessionLoaded done', session);
      dispatch(getUserSettings(session));
      // console.log('getUserSettings done', session);
      // dispatch(loadPending(session.id));
      dispatch(loadRecents(search.recents));

    });
  };
}
function sessionLoaded(session) {
  return {
    type: "SESSION_LOADED",
    value: session
  };
}

// Adding the calls to fetch 1 entity.
function getUserSettings(session) {
  // console.log('getUserSettings', session);
  return function (dispatch) {
    fetch(`/users/settings/${session.id}`)
    .then( (response) => {
      return response.json();
    }).then((settings) => {
      // console.log('getUserSettings.then', settings);
      dispatch(getUserSettingsDone(session, settings));
    });
  };
}
function getUserSettingsDone(session, settings) {
  const newSession = {...session, userSettings: {...settings}};
  return {
    type: "SESSION_LOADED",
    value: newSession
  };
}

export function updateSettings(session, settings) {
  return function (dispatch) {
    // console.log('in commitAddress function', userID, create);
    fetch(`/users/settings/${session.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
      , body: JSON.stringify(settings)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      console.log('actions.updateSettings', response)
      if (response.errno) {
        // console.log('2nd .then create Address', response);
        throw response;
      };
      // loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadProjects());
      dispatch(getUserSettings(session));
    }).catch(err => {
      dispatch(loadMessage(
        { ok:false,
          status: `${err.errno}:${err.code}`,
          statusText: err.sqlMessage
        }, "ERROR"));
    });
  };
  // return function (dispatch) {
  //   // dispatch({
  //   //   type: "SETTINGS_UPDATED",
  //   //   value: settings
  //   // });
  //   dispatch(settingsUpdated(settings));
  // }
}

export function loadControls() {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/controls`)
    .then( (response) => {
      return response.json();
    }).then((controls) => {
      dispatch(controlsLoaded(controls));
    });
  };
}
function controlsLoaded(controls) {
  return {
    type: "CONTROLS_LOADED",
    value: controls
  };
}

export function loadRelationships() {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/relationships`)
    .then( (response) => {
      return response.json();
    }).then((relationships) => {
      dispatch(relationshipsLoaded(relationships));
    });
  };
}
function relationshipsLoaded(relationships) {
  return {
    type: "RELATIONSHIPS_LOADED",
    value: relationships
  };
}

export function loadTopMenu() {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/controls`)
    .then( (response) => {
      console.log('loadTopMenu response', response);
      return response.json();
    }).then((menu) => {
      console.log('action loadTopMenu', menu);
      dispatch(menuLoaded(menu));
    });
  };
}
function menuLoaded(menu) {
  return {
    type: "MENU_LOADED",
    value: menu
  };
}

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
      + `/:${search.status}`;
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
    const searchVal = searchFilter?searchFilter:search.recents;
    // console.log('In loadRecents', searchVal);
    fetch(`/recents/v2.0/${session.id}/${searchVal}`)
    .then( (response) => {
      return response.json();
    }).then((projects) => {
      let updatedSearch = {...search};
      updatedSearch.recents = searchVal;
      updatedSearch.recentsResults = projects;
      // console.log('.then loadRecents', updatedSearch);
      dispatch(searchLoaded(updatedSearch));
    });
  };
}

export function loadFind(searchFilter) {
  return function (dispatch, getState) {
    const { search } = getState();

    fetch(`/find/v2.0/${searchFilter}`)
    .then( (response) => {
      return response.json();
    }).then((projects) => {
      let updatedSearch = {...search};
      updatedSearch.find = searchFilter;
      updatedSearch.findResults = projects;
      // console.log('.then loadFind', updatedSearch);
      dispatch(searchLoaded(updatedSearch));
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
export function createAddress(c, v2 = false) {
  // console.log('Just in createAddress', c)
  return function (dispatch) {
    console.log('createAddress', v2);
    fetch(`/projects/${v2}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      if (response.errno) {
        console.log('Error: create Address', response);  // now has insertId
      }
      console.log('.then create Address', response);  // now has insertId
      // loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadProjects());
      // dispatch(saveProject(response));
      dispatch(loadRecents());
      dispatch(loadMessage(
        { ok:false,
          status: `New / Updated Job #`,
          statusText: response.job_number
        }, 'INFO'));

      // return response;
    });
  };
}

// Action to create the Address
export function commitAddresses(userID, c, search, create, v2 = false) {
  return function (dispatch) {
    console.log('in commitAddress function', userID, create, v2);
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
      console.log('2nd .then commit Address', response);
      // dispatch(loadProjects(search));
      dispatch(loadRecents());
      dispatch(loadMessage(
        { ok:false,
          status: `New / Updated Job #`,
          statusText: response.job_number
        }, 'INFO'));
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

/* CLIENTS ACTIONS */
// Loading the list of addresses
export function loadClients() {
  return function (dispatch) {
    fetch("/clients")
    .then( (response) => {
      return response.json();
    }).then((clients) => {
      dispatch(clientsLoaded(clients));
    });
  };
}
function clientsLoaded(clients) {
  return {
    type: "CLIENTS_LOADED",
    value: clients
  };
}

// Action to create the Client
export function createClient(c) {
  return function (dispatch) {
    fetch("/clients", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('createClient response', response);
      dispatch(loadClients())
      // console.log('after dispatch load clients', response);
      // return response;
    });
  };
}

// Action to delete the Client
export function deleteClient(id) {
  return function (dispatch) {
    fetch(`/clients/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadClients()));
  };
}

export function showHideClientDialog() {
  return {
    type: 'SHOW_CLIENT_DIALOG'
  };
}
/* CONTACTS ACTIONS */
// Loading the list of contacts
export function loadContacts() {
  return function (dispatch) {
    fetch("/contacts")
    .then( (response) => {
      return response.json();
    }).then((contacts) => {
      dispatch(contactsLoaded(contacts));
      const requestors = contacts.filter(c => c.requestor === 'Y');
      // console.log('the requestors', requestors);
      dispatch(requestorsLoaded(requestors));
    });
  };
}
function contactsLoaded(contacts) {
  return {
    type: "CONTACTS_LOADED",
    value: contacts
  };
}
function requestorsLoaded(requestors) {
  return {
    type: "REQUESTORS_LOADED",
    value: requestors
  };
}

// Action to create the Contact
export function createContact(c) {
  return function (dispatch) {
    fetch("/contacts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadContacts()));
  };
}

// Action to delete the Contact
export function deleteContact(id) {
  return function (dispatch) {
    fetch(`/contacts/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadContacts()));
  };
}

export function showHideContactDialog() {
  return {
    type: 'SHOW_CONTACT_DIALOG'
  };
}

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

// Action to create the City
export function createCity(c) {
  return function (dispatch) {
    fetch("/cities", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadCities()));
  };
}

// Action to delete the City
export function deleteCity(id) {
  return function (dispatch) {
    fetch(`/cities/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadCities()));
  };
}

export function showHideCityDialog() {
  return {
    type: 'SHOW_CITY_DIALOG'
  };
}

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

// Action to create the Subdivision
export function createSubdivision(c) {
  return function (dispatch) {
    fetch("/subdivisions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadSubdivisions()));
  };
}

// Action to delete the Subdivision
export function deleteSubdivision(id) {
  return function (dispatch) {
    fetch(`/subdivisions/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadSubdivisions()));
  };
}

export function showHideSubdivisionDialog() {
  return {
    type: 'SHOW_SUB_DIALOG'
  };
}

/* JOB NUMBER SEQUENCE ACTIONS */
// Loading the list of job number sequences
export function loadJobNumberSeqs() {
  return function (dispatch) {
    fetch("/jobnumberseqs")
    .then( (response) => {
      return response.json();
    }).then((jobnumberseqs) => {
      dispatch(jobnumberseqsLoaded(jobnumberseqs));
    });
  };
}
function jobnumberseqsLoaded(jobnumberseqs) {
  return {
    type: "JOBNUMBERSEQS_LOADED",
    value: jobnumberseqs
  };
}

// Action to create the job number sequence
export function createJobNumberSeq(c) {
  return function (dispatch) {
    fetch("/jobnumberseqs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadJobNumberSeqs()));
  };
}

// Action to delete the job number sequence
export function deleteJobNumberSeq(id) {
  return function (dispatch) {
    fetch(`/jobnumberseqs/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadJobNumberSeqs()));
  };
}

/* Lookup ACTIONS */
// Retrieving the LOV specified by type: STATE, COUNTRY, etc.  You need to save the LOV in an array when used.  The state of lookupList changes.
export function getLookup(type) {
  return function (dispatch) {
    fetch(`/lookups/${type}`)
    .then( (response) => {
      return response.json();
    }).then((lookupList) => {
      dispatch(lookupLoaded(lookupList, type));
    });
  };
}
function lookupLoaded(lookupList, type) {
  if (type === 'STATE') {
    return {
      type: "STATELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'COUNTRY') {
    return {
      type: "COUNTRYLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'ROLE') {
    return {
      type: "ROLELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'TRELLO_LIST') {
    return {
      type: "TRELLOLISTLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'RECORD_STATUS') {
    return {
      type: "RECORDSTATUSLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'PROJECT_STATUS') {
    return {
      type: "PROJECTSTATUSLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'SCOPE') {
    return {
      type: "SCOPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'CLASSIFICATION') {
    return {
      type: "CLASSIFICATIONLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'MASONRY') {
    return {
      type: "MASONRYLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'YN') {
    return {
      type: "YNLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'FND_TYPE') {
    return {
      type: "FNDTYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'GARAGE_TYPE') {
    return {
      type: "GARAGETYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'GARAGE_ENTRY') {
    return {
      type: "GARAGEENTRYLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'GARAGE_SWING') {
    return {
      type: "GARAGESWINGLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'FLOOR_TYPE') {
    return {
      type: "FLOORTYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'ROOF_TYPE') {
    return {
      type: "ROOFTYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'COVERED_PATIO') {
    return {
      type: "COVEREDPATIO_LOADED",
      value: lookupList
    };
  }
  if (type === 'PITA') {
    return {
      type: "PITA_LOADED",
      value: lookupList
    };
  }
  if (type === 'DWELLING_TYPE') {
    return {
      type: "DWELLINGTYPE_LOADED",
      value: lookupList
    };
  }
}

// Action to create the Account
export function authenticate() {

  // localStorage.removeItem('token');
  const authToken = localStorage.getItem('token');
  // console.log('authenticate: token', authToken);

  if (authToken == null) {
  // if (true) {
    // console.log('token is undefined');
    // return {false}
    null;
  }
  else {
    // console.log('authenticate: In the else');
    return function (dispatch) {
    fetch(`/authenticate/${authToken}`)
      .then( (response) => {
        // console.log('authenticate response', response);
        return response.json();
    }).then((response) => {
        // console.log('authenticate response.json 1', response);
        if (!response.ok) {
          dispatch(loadMessage(
            { ok:false,
              status: 'User',
              statusText: 'User could not be found'
            }, "ERROR"));
            localStorage.removeItem('token');
        } else {
          // console.log('authenticate response.json 2', response);
          dispatch(loadSession(response.data.username));
        }
    }).catch( err => {
        // console.log("authenticate.catch", err);
        dispatch(loadMessage(
          { ok:false,
            status: 401,
            statusText: "Caught unknown authorization error"
          }, "ERROR"));
        localStorage.removeItem('token');

        return false;
      });
    };
  }  // else statement
  // return retValue;
}

// Action to create the Account
export function signUp(user) {
  return function (dispatch) {
    fetch("/signUp", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then( response => {
      // console.log("signUp response", response);
      if ( !response.ok ) {
        dispatch(loadMessage(response, "ERROR"));
      }
      else {
        const res = response.json();
        if (res.approved === 'Y') {
          // console.log("signUp.then else part", res);
          localStorage.setItem('token', res.token);
          dispatch(sessionLoaded({
            user_id: res.user_id,
            username: res.username,
            auth_key: res.auth_key,
            authenticated: true,
            token: res.token,
            approved: res.approved,
            contact_id: null,
            full_name: "",
            role: "",
            client_id: null,
            client_name: ""
          }));
        } else {
          dispatch(loadMessage(
            { ok:false,
              status: 'Pending Approval',
              statusText: `Account approval has been sent to Copeland Engineering.
              It may take up to 3 business days for approval.  If you have any questions please contact
              Copeland Engineering: 512-800-9200`
            }, "INFO"));
        }
      }
    }).catch( err => {
      // console.log("signUp.catch", err);
      dispatch(loadMessage(
        { ok:false,
          status: 401,
          statusText: "Caught unknown authorization error"
        }, "ERROR"));
    });
  };
}

// Action to Login
export function signIn(user) {
  return function (dispatch) {
    fetch("/signIn", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then( response => {
      // console.log("signIn response", response);
      if ( !response.ok ) {
        dispatch(loadMessage(response, "ERROR"));
        return Promise.reject('failed');
      }
      return response.json();
      // else {
      //   const res = response.json();
      //   console.log('signIn.then else part.  Pass', res, user.email);
      //   localStorage.setItem('token', res.token);
      //   dispatch(loadSession(user.email));
      // }
    }).then( theUser => {
      if (theUser.approved === 'Y') {
        // console.log("signIn response", theUser);
        localStorage.setItem('token', theUser.token);
        dispatch(loadSession(user.email));
      } else {
        dispatch(loadMessage(
          { ok:false,
            status: 'Pending Approval',
            statusText: `Account has not been approved yet to
            use CE Webtools software.  If you requested approval more
            than 3 business days ago, please contact CE: 512-800-9200`
          }, "INFO"));
      }

    }).catch( err => {
      // console.log("signIn.catch", err);
      dispatch(loadMessage(
        { ok:false,
          status: 401,
          statusText: "Caught unknown authorization error"
        }, "ERROR"));
    });
  };
}

// Action to logout
export function signOut() {

  return function (dispatch) {
    // console.log('signOut');
    localStorage.removeItem('token');

    dispatch(sessionLoaded(
      {
      user_id: null,
      username: '',
      auth_key: '',
      authenticated: false,
      token: '',
      contact_id: null,
      first_name: '',
      full_name: '',
      role: '',
      client_id: null,
      client_name: ''
      }
    ));
  };

}
// export function loadSession(username) {
//   return function (dispatch) {
//     fetch(`/session/${username}`)
//     .then( (response) => {
//       return response.json();
//     }).then((session) => {
//       dispatch(sessionLoaded(session));
//       dispatch(loadPending(session.id));
//     });
//   };
// }

export function loadMessage(message, type) {
  // console.log("In loadMessage", message);
  if (type === 'ERROR') {
    return {
      type: "MESSAGE_LOADED",
      value: {
        ok: message.ok,
        type: type,
        status: message.status,
        title: `${type[0]+type.slice(1).toLowerCase()}: ${message.status}`,
        content: message.statusText
      }
    };
  }
  if (type === 'WARN') {
    return {
      type: "MESSAGE_LOADED",
      value: {
        ok: message.ok,
        type: type,
        status: message.status,
        title: `${type[0]+type.slice(1).toLowerCase()}: ${message.status}`,
        content: message.statusText
      }
    };
  }
  if (type === 'INFO') {
    return {
      type: "MESSAGE_LOADED",
      value: {
        ok: message.ok,
        type: type,
        status: message.status,
        title: `${type[0]+type.slice(1).toLowerCase()}: ${message.status}`,
        content: message.statusText
      }
    };
  }
}

export function ackMessage() {
  // console.log("In ackMessage");
  return {
    type: "MESSAGE_LOADED",
    value: {
      ok: true,
      type: "",
      status: null,
      title: "",
      content: ""
    }
  };
}

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
    });
  };
}
function geosLoaded(geos) {
  return {
    type: "GEOS_LOADED",
    value: geos
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

// Loading the current Menu based on passed parent id.
export function loadCurrentMenu(parent_id) {
  // console.log('In loadCurrentMenu', parent_id);
  return function (dispatch, getState) {
    const { avffControls, avffRelationships } = getState();
    if (avffControls.length > 0 && avffRelationships.length > 0) {
      // console.log('loadCurrentMenu', avffControls, avffRelationships);
      let a = avffRelationships.filter(child => child.parent_id === parent_id);
      let c = [];
      for (let i = 0; i < a.length; i++) {
        let b = avffControls.find(control => control.id === a[i].control_id);
        // Only take controls that are Menus / Actions.
        ['MENU', 'ACTION'].includes(b.entity_type)? c.push({ ...b, ...a[i] }):null;
      }

      let parent = null;
      if (parent_id === null) {
        parent = {id: null, name: 'top', label: 'Main', entity_type: 'MENU'};
      } else {
        parent = avffControls.find(control => control.id === parent_id);
      }
      let currentControls = { ...parent, children: c };

      // console.log('load Menu', currentControls);

      dispatch(currentMenuLoaded(currentControls));
    } else {
      console.log('one array missing');
    }

  };
}
function currentMenuLoaded(currentControls) {
  return {
    type: "CURRENT_MENU_LOADED",
    value: currentControls
  };
}

export function assignNewProjectScope(scope) {
  return {
    type: "INITIAL_SCOPE_LOADED",
    value: scope
  };
}

export function updateProject(project) {
  return {
    type: "UPDATE_PROJECT",
    value: project
  };
}

export function clearProject() {
  return {
    type: "CLEAR_PROJECT",
    value: {}
  };
}

// loadCurrentView(parent_id)
export function getChildren(controls, relationships, theParent) {
  // console.log('In masterData');
    let c_rship = relationships.filter(child => child.parent_id === theParent.id);
    if (!c_rship) return [];

    let children = [];
    for (let i = 0; i < c_rship.length; i++) {
      let c_control = controls.find(control => control.id === c_rship[i].control_id);
      // only include children that are views, field groups, fields.
      if (!['MENU', 'ACTION'].includes(c_control.entity_type)) {
        children.push({ ...c_control, ...c_rship[i], children: getChildren(controls, relationships, c_control)})
      }
    }

    // console.log('children', children);
    return children;

}
// Loading the current Menu based on passed parent id.
export function loadViews(rootId) {
  // console.log('In masterData');
  return function (dispatch, getState) {
    const { avffControls, avffRelationships } = getState();

    const rootData = avffControls.find(control => control.id === rootId);
    const children = getChildren(avffControls, avffRelationships, rootData);

    const rootTree = { ...rootData, children: [...children] }
    // console.log('rootTree', rootTree);

    dispatch(viewsLoaded(rootTree));

  };
}
function viewsLoaded(rootTree) {
  return {
    type: "VIEWS_LOADED",
    value: rootTree
  };
}
