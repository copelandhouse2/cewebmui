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

// finding list of clients based on search string
export function findClients(findString) {
  // console.log('In findGeotechs');

  // find string is empty, clearing out find.
  if (!findString) {
    return function (dispatch) {
      dispatch(clientsFound(null, []));
    }
  }

  return function (dispatch) {
    fetch(`/clientsearch/${findString}`)
    .then( (response) => {
      return response.json();
    }).then((clients) => {
      // console.log('geos', geos);
      dispatch(clientsFound(findString, clients));
    });
  };
}
function clientsFound(findString, clients) {
  return {
    type: "CLIENT_SEARCH_LOADED",
    value: {
      find: findString,
      findResults: clients
    }
  };
}

// Action to create the Client.  Used by ClientDialog
export function createClient(c) {
  return function (dispatch) {
    fetch("/clientadd", {
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

// Action to add or update the Client
export function saveClients(c) {
  return function (dispatch, getState) {
    const { clientSearch } = getState();
    fetch("/clients", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('saveClient response', response);
      dispatch(loadClients())
      dispatch(findClients(clientSearch.find));
      // console.log('after dispatch load clients', response);
      // return response;
    });
  };
}

// Action to delete the Client
export function deleteClient(id) {
  return function (dispatch, getState) {
    const { clientSearch } = getState();
    fetch(`/clients/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(loadClients());
      dispatch(findClients(clientSearch.find));

    })
  };
}

export function showHideClientDialog() {
  return {
    type: 'SHOW_CLIENT_DIALOG'
  };
}
