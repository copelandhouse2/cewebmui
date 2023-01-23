import 'regenerator-runtime/runtime'

/* CLIENTS ACTIONS */
// Loading the list of clients
export function loadClients(parentFunc=null,value=null) {
  return function (dispatch, getState) {
    const { clientSearch } = getState();
    fetch("/clients")
    .then( (response) => {
      return response.json();
    }).then((clients) => {
      dispatch(clientsLoaded(clients));
      if (parentFunc) {  // coming from saveClients, deleteClient
        dispatch(getClientData(value));
        dispatch(findClients(clientSearch.find));
      }
    });
  };
}
function clientsLoaded(clients) {
  // console.log('loadClients updated', clients);
  return {
    type: "CLIENTS_LOADED",
    value: clients
  };
}

// Loading / Updating the current Client selected.
// Called when a) clicking a card, b) Saving client.
export function getClientData(client_id) {
  // console.log('getClientData ACTION', client_id);
  return function (dispatch,getState) {
    if (client_id === 'new'||client_id === 'deleted') {
      // console.log('did it work?')
      dispatch(clientDataLoaded({change:'updated'}));
    } else {
      let { currentClient } = getState();
      const table = 'clients';
      fetch(`/clients/${table}/${client_id}`)
      .then( (response) => {
        return response.json();
      }).then((clientData) => {
        // console.log('getClientData BEFORE', clientData);
        let c = {...clientData};
        c.change = 'updated';  // used to update local state.
        // console.log('getClientData AFTER', c);
        dispatch(clientDataLoaded(c));
      });
    }
  };
}
function clientDataLoaded(clientData) {
  return {
    type: "CLIENT_DATA_LOADED",
    value: clientData
  };
}

export function clientAck() {
  return function (dispatch, getState) {
    let { currentClient } = getState();

    // console.log('client Acknowledgement BEFORE', currentClient);
    let c={...currentClient};
    c.change = false;
    // console.log('client Acknowledgement AFTER', c);
    dispatch(clientDataLoaded(c));
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
// Right now only updates 1 client.
export function saveClients(c) {
  // console.log('client to save', c)
  return function (dispatch, getState) {
    const { clientSearch } = getState();
    fetch("/clients", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      (async () => {
        try {
          // console.log('saveClient async',response);
          dispatch(loadClients('save',response.id));
          // await Promise.all([dispatch(loadClients('save',response.id))]);
          // dispatch(getClientData(response.id));
          // dispatch(findClients(clientSearch.find));
          // return response;
        } catch (err) {
          console.log('client error:', err);
        }
      })(response);
      // return response;
      // dispatch(getClientData(response.id));
      // dispatch(findClients(clientSearch.find));
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
      dispatch(loadClients('delete','deleted'));
      // dispatch(getClientData('deleted'));
      // dispatch(findClients(clientSearch.find));
    })
  };
}

export function showHideClientDialog() {
  return {
    type: 'SHOW_CLIENT_DIALOG'
  };
}

// **************** CLIENT Comments ****************
// Action to add or update the Client
// Right now only updates 1 client.
// parameter is comment array.
//**************************************************
export function saveClientComment(c) {
  // console.log('comment to save', c)
  return async function (dispatch, getState) {
    try {
      let r = await fetch("/comments", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(c)
          })
      const responses = await r.json();
      // console.log('saveClientComment async',responses, c);
      // right now this app passes a change one at a time.  So...
      dispatch(getClientData(c[0].table_id));
    } catch (err) {
      console.log('client error:', err);
    }
  };
}

// parameter is comment array.
export function deleteClientComment(c) {
  // console.log('comment to delete', c)
  return async function (dispatch, getState) {
    try {
      let r = await fetch(`/comments/${c.id}`, {
            method: "DELETE",
          })
      const responses = await r.json();
      // console.log('saveClientComment async',responses, c);
      // right now this app passes a change one at a time.  So...
      dispatch(getClientData(c[0].table_id));
    } catch (err) {
      console.log('client error:', err);
    }
  };
}
