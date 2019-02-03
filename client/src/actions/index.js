// import AlertDialog from "../components/AlertDialog";
// import { STATUS_CODES } from "http";

/* SESSION ACTION */
// Loading the list of addresses
export function loadSession(username) {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/session/${username}`)
    .then( (response) => {
      // console.log('response', response);
      return response.json();
    }).then((session) => {
      dispatch(sessionLoaded(session));
      dispatch(loadPending(session.id));
    });
  };
}
function sessionLoaded(session) {
  return {
    type: "SESSION_LOADED",
    value: session
  };
}

/* ADDRESSES ACTIONS */
// Loading the list of addresses
export function loadAddresses() {
  return function (dispatch) {
    fetch("/starts")
    .then( (response) => {
      return response.json();
    }).then((addresses) => {
      dispatch(addressesLoaded(addresses));
    });
  };
}

export function loadPending(userID) {
  return function (dispatch) {
    fetch(`/pending/${userID}`)
    .then( (response) => {
      return response.json();
    }).then((addresses) => {
      dispatch(addressesLoaded(addresses));
    });
  };
}

function addressesLoaded(addresses) {
  return {
    type: "ADDRESSES_LOADED",
    value: addresses
  };
}

// Action to create the Address
export function createAddress(c, userID, loadType) {
  // console.log('Just in createAddress', c, userID, loadType)
  return function (dispatch) {
    // console.log('in function',userID, loadType)
    fetch("/starts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('.then create Address', response);  // now has insertId
      loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadAddresses());
    });
  };
}

// Action to create the Address
export function commitAddresses(c, userID, loadType) {
  return function (dispatch) {
    // console.log('in commitAddress function', c, userID, loadType);
    fetch(`/commits/${userID}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
      , body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('.then create Address', response);
      loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadAddresses());
    });
  };
}

// Adding the calls to fetch 1 entity.
export function getAddress(id) {
  return function (dispatch) {
    fetch(`/starts/${id}`)
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
export function deleteAddress(id, userID, loadType) {
  // console.log('deleteAddress',id)
  return function (dispatch) {
    fetch(`/starts/${id}`, {
      method: "DELETE"
    }).then(() =>
      loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadAddresses()));
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
    });
  };
}
function contactsLoaded(contacts) {
  return {
    type: "CONTACTS_LOADED",
    value: contacts
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
  }
  else {
    // console.log('authenticate: In the else');
    return function (dispatch) {
    fetch(`/authenticate/${authToken}`)
      .then( (response) => {
        // console.log('authenticate response', response);
        return response.json();
    }).then((user) => {
        // console.log('authenticate response.json', user);
        dispatch(loadSession(user.username));
        // return true;
    }).catch( err => {
        // console.log("authenticate.catch", err);
        dispatch(loadMessage(
          { ok:false,
            status: 401,
            statusText: "Caught unknown authorization error"
          }, "ERROR"));
        // return false;
      });
    };
  }  // else statement
  // return false;
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
        // console.log("signUp.then else part", res);
        localStorage.setItem('token', res.token);
        dispatch(sessionLoaded({
          user_id: res.user_id,
          username: res.username,
          auth_key: res.auth_key,
          authenticated: true,
          token: res.token,
          contact_id: null,
          full_name: "",
          role: "",
          client_id: null,
          client_name: ""
        }));
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
      // console.log("signIn response", theUser);
      localStorage.setItem('token', theUser.token);
      dispatch(loadSession(user.email));
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
// Action to select the Account
// export function signIn(user) {
//   return function (dispatch) {
//     fetch("/signIn", {
//       method: "GET",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(user)
//     })
//     .then( (response) => {
//       return response.json();
//     }).then((address) => {
//       dispatch(getAddressDone(address));
//     });
//   };
// }
// Retrieving the country LOV
// export function getCountryLookup(type) {
//   return function (dispatch) {
//     fetch(`/lookupcountries/${type}`)
//     .then( (response) => {
//       return response.json();
//     }).then((lookupList) => {
//       dispatch(lookupLoaded(lookupList));
//     });
//   };
// }
// function lookupStateLoaded(addresses) {
//   return {
//     type: "STATE_LOOKUP_LOADED",
//     value: statesLOV
//   };
// }

// Adding the calls to fetch 1 entity.
// export function getAddress(id) {
//   return function (dispatch) {
//     fetch(`/starts/${id}`)
//     .then( (response) => {
//       return response.json();
//     }).then((address) => {
//       dispatch(getAddressDone(address));
//     });
//   };
// }
// function getAddressDone(address) {
//   return {
//     type: "GET_ADDRESS_DONE",
//     value: address
//   };
// }
