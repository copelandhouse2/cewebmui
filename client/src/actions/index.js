/* SESSION ACTION */
// Loading the list of addresses
export function loadSession(username) {
  return function (dispatch) {
    fetch(`/session/${username}`)
    .then( (response) => {
      return response.json();
    }).then((session) => {
      dispatch(sessionLoaded(session));
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
function addressesLoaded(addresses) {
  return {
    type: "ADDRESSES_LOADED",
    value: addresses
  };
}

// Action to create the Address
export function createAddress(c) {
  return function (dispatch) {
    fetch("/starts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then(() => dispatch(loadAddresses()));
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
export function deleteAddress(id) {
  return function (dispatch) {
    fetch(`/starts/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadAddresses()));
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
    }).then(() => dispatch(loadClients()));
  };
}

// Adding the calls to fetch 1 entity.
// export function getClient(id) {
//   return function (dispatch) {
//     fetch(`/clients/${id}`)
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

// Action to delete the Client
export function deleteClient(id) {
  return function (dispatch) {
    fetch(`/clients/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(loadClients()));
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
        console.log("Error loading cities", err.status, err.statusText)
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
}

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

